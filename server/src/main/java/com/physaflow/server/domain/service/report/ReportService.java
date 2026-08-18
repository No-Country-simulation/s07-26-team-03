package com.physaflow.server.domain.service.report;

import com.physaflow.server.application.dto.assessment.AssessmentResultResponse;
import com.physaflow.server.application.dto.layeranalysis.LayerAnalysisResponse;
import com.physaflow.server.application.dto.scenario.ScenarioResponse;
import com.physaflow.server.application.exception.business.entity.EntityNotFoundException;
import com.physaflow.server.application.mapper.LayerAnalysisMapper;
import com.physaflow.server.application.mapper.ScenarioMapper;
import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.AssessmentResult;
import com.physaflow.server.domain.model.LayerAnalysis;
import com.physaflow.server.domain.model.Scenario;
import com.physaflow.server.domain.model.ScenarioResult;
import com.physaflow.server.domain.service.AssessmentService;
import com.physaflow.server.domain.service.ShareService;
import com.physaflow.server.infrastructure.repository.AssessmentRepository;
import com.physaflow.server.infrastructure.repository.AssessmentResultRepository;
import com.physaflow.server.infrastructure.repository.LayerAnalysisRepository;
import com.physaflow.server.infrastructure.repository.ScenarioRepository;
import com.physaflow.server.infrastructure.repository.ScenarioResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Builds the assessment PDF report on the fly.
 * Aggregates the assessment result, the layer analysis and the
 * scenarios (when available) and renders them as a PDF document.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ReportService {

    private final AssessmentService assessmentService;
    private final ShareService shareService;
    private final AssessmentRepository assessmentRepository;
    private final AssessmentResultRepository assessmentResultRepository;
    private final LayerAnalysisRepository layerAnalysisRepository;
    private final ScenarioRepository scenarioRepository;
    private final ScenarioResultRepository scenarioResultRepository;
    private final LayerAnalysisMapper layerAnalysisMapper;
    private final ScenarioMapper scenarioMapper;
    private final PdfReportGenerator pdfReportGenerator;

    /**
     * Generates the PDF report for the authenticated user,
     * verifying ownership of the assessment.
     */
    @Transactional(readOnly = true)
    public byte[] generateAssessmentReportPdf(UUID assessmentId) {
        log.info("Generating PDF report for assessment ID: {}", assessmentId);

        Assessment assessment = assessmentService.findByIdForCurrentUser(assessmentId);

        return buildReportPdf(assessment);
    }

    /**
     * Generates the PDF report for a public share link,
     * validating the token without incrementing its view counter.
     */
    @Transactional(readOnly = true)
    public byte[] generatePublicShareReportPdf(String token) {
        log.info("Generating PDF report for public share token.");

        UUID assessmentId = shareService.getAssessmentIdByPublicToken(token);

        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new EntityNotFoundException("Link not found or expired."));

        return buildReportPdf(assessment);
    }

    private byte[] buildReportPdf(Assessment assessment) {
        UUID assessmentId = assessment.getId();

        AssessmentResult result = assessmentResultRepository.findByAssessmentId(assessmentId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "No calculation result found for assessment ID: " + assessmentId));

        AssessmentResultResponse resultResponse = toResultResponse(assessment, result);

        LayerAnalysisResponse layerAnalysis = findLayerAnalysis(assessment);

        ScenarioResponse scenarios = findScenarios(assessment, result);

        return pdfReportGenerator.generate(resultResponse, layerAnalysis, scenarios);
    }

    private LayerAnalysisResponse findLayerAnalysis(Assessment assessment) {
        List<LayerAnalysis> analyses = layerAnalysisRepository
                .findByAssessmentIdOrderByDisplayOrderAsc(assessment.getId());

        if (analyses.isEmpty()) {
            log.debug("No layer analysis found for assessment ID: {}. Skipping section.",
                    assessment.getId());
            return null;
        }

        return layerAnalysisMapper.toResponse(assessment, analyses);
    }

    private ScenarioResponse findScenarios(Assessment assessment, AssessmentResult currentResult) {
        List<Scenario> scenarios = scenarioRepository
                .findByAssessmentIdOrderBySortOrderAsc(assessment.getId());

        if (scenarios.isEmpty()) {
            log.debug("No scenarios found for assessment ID: {}. Skipping section.",
                    assessment.getId());
            return null;
        }

        Map<UUID, ScenarioResult> resultsByScenarioId = scenarioResultRepository
                .findByScenarioAssessmentId(assessment.getId())
                .stream()
                .collect(Collectors.toMap(
                        scenarioResult -> scenarioResult.getScenario().getId(),
                        Function.identity()
                ));

        return scenarioMapper.toResponse(assessment, currentResult, scenarios, resultsByScenarioId);
    }

    private AssessmentResultResponse toResultResponse(Assessment assessment, AssessmentResult result) {
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
}
