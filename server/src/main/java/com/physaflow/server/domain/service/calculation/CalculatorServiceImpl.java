package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.command.AssessmentCommand;
import com.physaflow.server.domain.model.Calculation;
// Asegúrate de tener creado tu repositorio:
// import com.physaflow.server.infrastructure.persistence.CalculationRepository;
import com.physaflow.server.infrastructure.repository.CalculationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.SecureRandom;
import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalculatorServiceImpl implements CalculatorService {

    private final CalculationRepository calculationRepository;

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    private static final BigDecimal HOURS_PER_YEAR = new BigDecimal("8760");
    private static final BigDecimal HUNDRED = new BigDecimal("100");
    private static final BigDecimal TARIFF_USD_PER_MWH = new BigDecimal("70.00"); // Puede inyectarse vía @Value
    private static final BigDecimal HIGH_WASTE_MULTIPLIER = new BigDecimal("1.15");

    @Override
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
    public Calculation processInitialAssessment(AssessmentCommand command) {
        log.debug("Procesando estimación para Capacidad: {} MW", command.totalCapacityMw());

        // 1. Factores de Eficiencia
        String coolingType = normalizeCoolingType(command.coolingType());
        BigDecimal coolingFactor = determineCoolingFactor(coolingType);

        // 2. Lógica Matemática de Capacidad Varada (Stranded)
        BigDecimal utilizationFraction = command.utilizationPct().divide(HUNDRED, 4, RoundingMode.HALF_UP);
        BigDecimal effectiveFactor = utilizationFraction.multiply(coolingFactor).min(BigDecimal.ONE);
        BigDecimal strandedFactor = BigDecimal.ONE.subtract(effectiveFactor).max(BigDecimal.ZERO);

        BigDecimal strandedPct = strandedFactor.multiply(HUNDRED).setScale(2, RoundingMode.HALF_UP);
        BigDecimal strandedMw = command.totalCapacityMw().multiply(strandedFactor).setScale(2, RoundingMode.HALF_UP);

        // 3. Cálculos Financieros (Desperdicio)
        BigDecimal annualMwhWaste = strandedMw.multiply(HOURS_PER_YEAR);
        BigDecimal wasteUsdLow = annualMwhWaste.multiply(TARIFF_USD_PER_MWH).setScale(2, RoundingMode.HALF_UP);
        BigDecimal wasteUsdHigh = wasteUsdLow.multiply(HIGH_WASTE_MULTIPLIER).setScale(2, RoundingMode.HALF_UP);

        // 4. Mapeo a la entidad de Dominio (Asumiendo patrón Builder de Lombok)
        Calculation calculation = Calculation.builder()
                .id(generateShareToken()) // URL amigable (e.g. physaflow.com/c/X7aB92)
                .facilityMw(command.totalCapacityMw())
                .utilizationPct(command.utilizationPct())
                .coolingType(coolingType)
                .strandedPct(strandedPct)
                .strandedMw(strandedMw)
                .wasteUsdLow(wasteUsdLow)
                .wasteUsdHigh(wasteUsdHigh)
                .build();


        calculation = calculationRepository.save(calculation);

        log.info("Cálculo finalizado exitosamente. Token generado: {}", calculation.getId());
        return calculation;
    }

    private String normalizeCoolingType(String coolingType) {
        return (coolingType == null || coolingType.isBlank()) ? "air" : coolingType.trim().toLowerCase();
    }

    private BigDecimal determineCoolingFactor(String coolingType) {
        return switch (coolingType) {
            case "liquid"    -> new BigDecimal("0.90");
            case "immersion" -> new BigDecimal("0.95");
            case "hybrid"    -> new BigDecimal("0.85");
            default          -> new BigDecimal("0.75"); // Air cooling (default)
        };
    }

    private String generateShareToken() {
        byte[] buffer = new byte[9];
        SECURE_RANDOM.nextBytes(buffer);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(buffer);
        return token.substring(0, Math.min(token.length(), 12));
    }
}