package com.physaflow.server.domain.service;

import com.physaflow.server.application.dto.assessment.AssessmentInitializeResponse;
import com.physaflow.server.application.dto.assessment.AssessmentRequest;
import com.physaflow.server.application.dto.assessment.AssessmentResultResponse;
import com.physaflow.server.application.exception.ConfigurationNotFoundException;
import com.physaflow.server.application.exception.business.entity.EntityNotFoundException;
import com.physaflow.server.application.exception.http.ConflictException;
import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.AssessmentResult;
import com.physaflow.server.domain.model.CalculationConfiguration;
import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.domain.model.enums.AssessmentStatus;
import com.physaflow.server.domain.model.enums.CapacityScore;
import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.types.CalculationInput;
import com.physaflow.server.domain.model.types.CalculationResult;
import com.physaflow.server.domain.service.calculation.CalculationEngine;
import com.physaflow.server.infrastructure.repository.AssessmentRepository;
import com.physaflow.server.infrastructure.repository.AssessmentResultRepository;
import com.physaflow.server.infrastructure.repository.CalculationConfigurationRepository;
import com.physaflow.server.infrastructure.repository.LeadRepository;
import com.physaflow.server.infrastructure.security.SecurityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final AssessmentResultRepository assessmentResultRepository;
    private final CalculationConfigurationRepository configurationRepository;
    private final LeadRepository leadRepository;
    private final SecurityService securityService;
    private final CalculationEngine calculationEngine;

    private static final String ALGORITHM_VERSION = "v1.2.0-core";

    private static final BigDecimal NINETY = new BigDecimal("90.00");
    private static final BigDecimal SEVENTY = new BigDecimal("70.00");
    private static final BigDecimal FIFTY = new BigDecimal("50.00");
    private static final BigDecimal THIRTY = new BigDecimal("30.00");

    @Transactional
    public AssessmentInitializeResponse saveAssessment(AssessmentRequest request) {
        log.info("Procesando cálculo inicial anónimo para Facility MW: {}", request.facilityMw());

        // 1. Autogeneración de sesión si el cliente opera de forma anónima
        UUID sessionId = (request.sessionId() != null) ? request.sessionId() : UUID.randomUUID();

        // 2. Resolución defensiva del Lead (Opcional en la Etapa 1)
        Lead lead = null;
        if (request.leadId() != null) {
            lead = leadRepository.findById(request.leadId())
                    .orElseThrow(() -> new EntityNotFoundException("Lead no encontrado con ID: " + request.leadId()));
        }

        // 3. Control de marcas de tiempo inmutables
        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
        LocalDateTime expiration = now.plusHours(24);

        // 4. Construcción de la entidad
        Assessment assessment = Assessment.builder()
                .sessionId(sessionId)
                .lead(lead)
                .facilityMw(request.facilityMw())
                .utilization(request.utilization())
                .coolingType(request.coolingType())
                .status(AssessmentStatus.DRAFT)
                .createdAt(now)
                .lastAccessedAt(now)
                .expiresAt(expiration)
                .build();

        // 5. Persistencia ACID optimizada
        Assessment savedAssessment = assessmentRepository.save(assessment);

        log.info("Assessment registrado exitosamente. ID: {}, Session: {}",
                savedAssessment.getId(), savedAssessment.getSessionId());

        // 6. Extracción segura del ID del lead para evitar NullPointerException
        UUID resolvedLeadId = (savedAssessment.getLead() != null) ? savedAssessment.getLead().getId() : null;

        return new AssessmentInitializeResponse(
                savedAssessment.getId(),
                savedAssessment.getSessionId(),
                resolvedLeadId,
                savedAssessment.getStatus(),
                savedAssessment.getExpiresAt()
        );
    }

    @Transactional
    public AssessmentResultResponse calculateBasicAnalisys(UUID assessmentId) {


        Assessment assessment = assessmentRepository.findById(assessmentId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Assessment no encontrado con ID: "
                                                + assessmentId
                                )
                        );

        CalculationConfiguration configuration = configurationRepository.findActiveConfiguration()
                        .orElseThrow(() ->
                                new ConfigurationNotFoundException(
                                        "No se encontró configuración activa del motor."
                                )
                        );

        CalculationInput input =
                new CalculationInput(
                        assessment.getFacilityMw(),
                        assessment.getUtilization(),
                        assessment.getCoolingType()
                );

        CalculationResult calculation =
                calculationEngine.calculate(
                        input,
                        configuration
                );


        AssessmentResult result =
                AssessmentResult.builder()
                        .assessment(assessment)
                        .configuration(configuration)
                        .strandedPercent(calculation.strandedPercent())
                        .strandedMw(calculation.strandedMw())
                        .annualCostMin(calculation.annualCostMin())
                        .annualCostMax(calculation.annualCostMax())
                        .capacityScore(calculation.capacityScore().score())
                        .recommendationSummary(calculation.recommendationSummary().description())
                        .algorithmVersion(ALGORITHM_VERSION)
                        .calculatedAt(LocalDateTime.now(ZoneOffset.UTC))
                        .build();

        assessmentResultRepository.save(result);


        return new AssessmentResultResponse(
                result.getId(),
                configuration.getId(),
                assessment.getId(),
                assessment.getFacilityMw(),
                assessment.getUtilization(),
                assessment.getCoolingType(),
                result.getStrandedPercent(),
                result.getStrandedMw(),
                result.getAnnualCostMin(),
                result.getAnnualCostMax(),
                result.getCapacityScore().name(),
                result.getRecommendationSummary(),
                result.getAlgorithmVersion(),
                result.getCalculatedAt()
        );
    }


    @Transactional
    public AssessmentResultResponse calculateAndSaveResult(UUID assessmentId) {
        // 1. Recuperación atómica de entidades con manejo estricto de excepciones
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new EntityNotFoundException("Assessment no encontrado con ID: " + assessmentId));

        CalculationConfiguration config = configurationRepository.findActiveConfiguration()
                .orElseThrow(() -> new ConfigurationNotFoundException("No se encontró configuración activa del motor en la base de datos."));

        // 2. Ejecución del Motor Matemático desacoplado
        BigDecimal strandedMw = calculateStrandedMw(assessment);

        // Stranded Percent = (Stranded MW / Facility MW) * 100
        BigDecimal strandedPercent = BigDecimal.ZERO;
        if (assessment.getFacilityMw().compareTo(BigDecimal.ZERO) > 0) {
            strandedPercent = strandedMw
                    .divide(assessment.getFacilityMw(), 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .setScale(2, RoundingMode.HALF_UP);
        }

        // Annual Energy Loss Kwh = strandedMw * 1000 * hours_per_year
        BigDecimal annualEnergyLossKwh = strandedMw
                .multiply(config.getHoursPerYear())
                .multiply(config.getHoursPerYear());

        // Annual Cost = annual_energy_loss_kwh * energy_price_per_kwh
        BigDecimal annualCost = annualEnergyLossKwh
                .multiply(config.getEnergyPricePerKwh());

        // Proyecciones Min/Max (Varianza del 10%)
        BigDecimal annualCostMin = annualCost.multiply(new BigDecimal("0.90")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal annualCostMax = annualCost.multiply(new BigDecimal("1.10")).setScale(2, RoundingMode.HALF_UP);

        CapacityScore score = evaluateCapacityScore(strandedPercent);

        // 3. Persistencia Transaccional del Resultado
        AssessmentResult result = AssessmentResult.builder()
                .assessment(assessment)
                .configuration(config)
                .strandedPercent(strandedPercent)
                .strandedMw(strandedMw)
                .annualCostMin(annualCostMin)
                .annualCostMax(annualCostMax)
                .capacityScore(score)
                .recommendationSummary(generateRecommendation(score))
                .algorithmVersion(ALGORITHM_VERSION)
                .calculatedAt(LocalDateTime.now(ZoneOffset.UTC))
                .build();

        assessmentResultRepository.save(result);

        log.info("Cálculo finalizado exitosamente para Assessment ID: {}", assessmentId);

        // 4. Retorno del DTO Inmutable
        return new AssessmentResultResponse(
                result.getId(),
                result.getConfiguration().getId(),
                assessment.getId(),
                assessment.getFacilityMw(),
                assessment.getUtilization(),
                assessment.getCoolingType(),
                result.getStrandedPercent(),
                result.getStrandedMw(),
                result.getAnnualCostMin(),
                result.getAnnualCostMax(),
                result.getCapacityScore().name(),
                result.getRecommendationSummary(),
                result.getAlgorithmVersion(),
                result.getCalculatedAt()
        );
    }

    @Transactional(readOnly = true)
    public AssessmentResultResponse getResultByAssessmentId(UUID assessmentId) {
        log.debug("Consultando resultado para Assessment ID: {}", assessmentId);

        if (!assessmentRepository.existsById(assessmentId)) {
            throw new EntityNotFoundException("Assessment no encontrado con ID: " + assessmentId);
        }

        AssessmentResult result = assessmentResultRepository.findByAssessmentId(assessmentId)
                .orElseThrow(() -> new EntityNotFoundException("No se encontró un resultado de cálculo para el assessment ID: " + assessmentId));

        Assessment assessment = result.getAssessment();

        return new AssessmentResultResponse(
                result.getId(),
                result.getConfiguration().getId(),
                assessment.getId(),
                assessment.getFacilityMw(),
                assessment.getUtilization(),
                assessment.getCoolingType(),
                result.getStrandedPercent(),
                result.getStrandedMw(),
                result.getAnnualCostMin(),
                result.getAnnualCostMax(),
                result.getCapacityScore().name(),
                result.getRecommendationSummary(),
                result.getAlgorithmVersion(),
                result.getCalculatedAt()
        );
    }

    private BigDecimal calculateStrandedMw(Assessment assessment) {
        BigDecimal utilizationFactor = assessment.getUtilization()
                .divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);

        BigDecimal coolingFactor = resolveCoolingFactor(assessment.getCoolingType());

        BigDecimal effectiveUtilization = utilizationFactor.multiply(coolingFactor);
        BigDecimal usedCapacityMw = assessment.getFacilityMw().multiply(effectiveUtilization);

        BigDecimal strandedMw = assessment.getFacilityMw().subtract(usedCapacityMw)
                .setScale(2, RoundingMode.HALF_UP);

        if (strandedMw.compareTo(BigDecimal.ZERO) < 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return strandedMw;
    }

    private BigDecimal resolveCoolingFactor(CoolingType coolingType) {
        return switch (coolingType) {
            case AIR -> new BigDecimal("0.75");
            case HYBRID -> new BigDecimal("0.85");
            case LIQUID -> new BigDecimal("0.90");
            case IMMERSION -> new BigDecimal("0.95");
        };
    }

    private CapacityScore evaluateCapacityScore(BigDecimal strandedPercent) {
        if (strandedPercent == null) {
            throw new IllegalArgumentException("El porcentaje de capacidad varada no puede ser nulo para la evaluación de puntaje.");
        }
        if (strandedPercent.compareTo(NINETY) > 0) return CapacityScore.F;
        if (strandedPercent.compareTo(SEVENTY) > 0) return CapacityScore.D;
        if (strandedPercent.compareTo(FIFTY) > 0) return CapacityScore.C;
        if (strandedPercent.compareTo(THIRTY) > 0) return CapacityScore.B;
        return CapacityScore.A_PLUS;
    }

    private String generateRecommendation(CapacityScore score) {
        return switch (score) {
            case F -> "La capacidad varada es críticamente alta. Se recomienda acción inmediata — comienza por el desglose por capas para identificar la mayor fuente de pérdida.";
            case D -> "Tu facility está perdiendo una cantidad sustancial de capacidad y presupuesto cada año. Recomendamos un análisis completo por capas y un plan de right-sizing como prioridad.";
            case C, C_PLUS -> "Hay espacio para una mejora significativa. Una porción importante de tu capacidad instalada no está generando valor — revisa el desglose por capas para ubicar dónde ocurren las mayores pérdidas.";
            case A, A_PLUS, A_MINUS -> "Tu facility opera cerca del punto óptimo de eficiencia. Quedan oportunidades menores de ajuste — explora el análisis completo para encontrar los últimos puntos de capacidad recuperable.";
            case B, B_PLUS, B_MINUS -> "Tu facility rinde por encima del promedio, pero aún hay una cantidad relevante de capacidad varada. Revisa las capas de IT y workload para identificar oportunidades de right-sizing.";
        };
    }

    public void associateWithLead( UUID assessmentId, Lead lead) {

        Assessment assessment = assessmentRepository
                .findById(assessmentId)
                .orElseThrow(() ->
                        new EntityNotFoundException("Assessment not found.")
                );

        // Assessment todavía anónimo.
        if (assessment.getLead() == null) {

            assessment.setLead(lead);
            assessmentRepository.save(assessment);

            log.info(
                    "Assessment {} associated with lead {}",
                    assessmentId,
                    lead.getId()
            );

            return;
        }

        // Assessment ya pertenece al mismo Lead.
        if (assessment.getLead().getId().equals(lead.getId())) {
            return;
        }

        // Assessment pertenece a otro Lead.
        throw new ConflictException(
                "Assessment is already assigned to another user."
        );
    }

    public Assessment findByIdForCurrentUser(UUID assessmentId) {

        Lead currentLead =  securityService.getAuthenticatedLead();
        log.info(
                "Assessment {} associated with lead {}.",
                assessmentId,
                currentLead.getId()
        );


        return assessmentRepository
                .findByIdAndLeadId(
                        assessmentId,
                        currentLead.getId()
                )
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Assessment not found."
                        )
                );
    }


}