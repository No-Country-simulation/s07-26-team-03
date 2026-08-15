package com.physaflow.server.domain.service;


import com.physaflow.server.application.dto.layeranalysis.LayerAnalysisResponse;
import com.physaflow.server.application.exception.ConfigurationNotFoundException;
import com.physaflow.server.application.exception.business.entity.EntityNotFoundException;
import com.physaflow.server.application.mapper.LayerAnalysisMapper;
import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.CalculationConfiguration;
import com.physaflow.server.domain.model.LayerAnalysis;
import com.physaflow.server.domain.model.LossFactor;
import com.physaflow.server.domain.model.types.CalculationInput;
import com.physaflow.server.domain.model.types.LayerAnalysisCalculationResult;
import com.physaflow.server.domain.model.types.LayerCalculationResult;
import com.physaflow.server.domain.model.types.LossFactorCalculationResult;
import com.physaflow.server.domain.service.calculation.LayerCalculationService;
import com.physaflow.server.infrastructure.repository.CalculationConfigurationRepository;
import com.physaflow.server.infrastructure.repository.LayerAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class LayerAnalysisService {

    private final CalculationConfigurationRepository calculationConfigurationRepository;
    private final LayerAnalysisRepository layerAnalysisRepository;
    private final LayerCalculationService calculationEngine;
    private final LayerAnalysisMapper layerAnalysisMapper;
    private final AssessmentService assessmentService;


    /**
     * Calculates the layer analysis for an assessment,
     * replaces any previous analysis and persists the new result.
     */
    public LayerAnalysisResponse calculateAndPersist(
            UUID assessmentId
    ) {

        Assessment assessment =
                assessmentService.findByIdForCurrentUser(assessmentId);

        CalculationConfiguration configuration =
                calculationConfigurationRepository
                        .findActiveConfiguration()
                        .orElseThrow(() ->
                                new ConfigurationNotFoundException(
                                        "Active calculation configuration not found."
                                )
                        );

        CalculationInput input =
                new CalculationInput(
                        assessment.getFacilityMw(),
                        assessment.getUtilization(),
                        assessment.getCoolingType()
                );

        LayerAnalysisCalculationResult result =
                calculationEngine.calculate(
                        input,
                        configuration
                );

        deleteExistingAnalysis(assessmentId);

        List<LayerAnalysis> entities =
                buildEntities(
                        assessment,
                        result
                );

        List<LayerAnalysis> savedAnalyses =
                layerAnalysisRepository.saveAll(
                        entities
                );

        return layerAnalysisMapper.toResponse(
                assessment,
                savedAnalyses
        );
    }

    /**
     * Retrieves the previously calculated layer analysis
     * for an assessment.
     */
    @Transactional(readOnly = true)
    public LayerAnalysisResponse getByAssessmentId(
            UUID assessmentId
    ) {

        Assessment assessment =
                assessmentService.findByIdForCurrentUser(assessmentId);

        List<LayerAnalysis> analyses =
                layerAnalysisRepository
                        .findByAssessmentIdOrderByDisplayOrderAsc(
                                assessmentId
                        );

        if (analyses.isEmpty()) {

            throw new EntityNotFoundException(
                    "Layer analysis not found for assessment."
            );
        }

        return layerAnalysisMapper.toResponse(
                assessment,
                analyses
        );
    }


    private List<LayerAnalysis> buildEntities(
            Assessment assessment,
            LayerAnalysisCalculationResult result
    ) {

        List<LayerAnalysis> entities =
                new ArrayList<>();

        for (LayerCalculationResult layerResult :
                result.layers()) {

            LayerAnalysis layerAnalysis =
                    LayerAnalysis.builder()
                            .assessment(assessment)
                            .layer(layerResult.layer())
                            .inputMw(layerResult.inputMw())
                            .outputMw(layerResult.outputMw())
                            .lossMw(layerResult.lossMw())
                            .lossPercent(layerResult.lossPercent())
                            .displayOrder(layerResult.displayOrder())
                            .build();

            for (LossFactorCalculationResult factorResult :
                    layerResult.lossFactors()) {

                LossFactor lossFactor =
                        LossFactor.builder()
                                .factor(factorResult.factor())
                                .impactPercent(
                                        factorResult.impactPercent()
                                )
                                .impactMw(
                                        factorResult.impactMw()
                                )
                                .build();

                layerAnalysis.addLossFactor(
                        lossFactor
                );
            }

            entities.add(layerAnalysis);
        }

        return entities;
    }

    private void deleteExistingAnalysis(
            UUID assessmentId
    ) {

        layerAnalysisRepository
                .deleteByAssessmentId(
                        assessmentId
                );
    }
}