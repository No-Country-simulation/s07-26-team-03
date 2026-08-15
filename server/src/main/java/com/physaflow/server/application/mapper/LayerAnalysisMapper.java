package com.physaflow.server.application.mapper;

import com.physaflow.server.application.dto.layeranalysis.LayerAnalysisResponse;
import com.physaflow.server.application.dto.layeranalysis.LayerResponse;
import com.physaflow.server.application.dto.layeranalysis.LossFactorResponse;
import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.LayerAnalysis;
import com.physaflow.server.domain.model.LossFactor;
import com.physaflow.server.domain.model.enums.LayerType;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Component
public class LayerAnalysisMapper {

    public LayerAnalysisResponse toResponse(
            Assessment assessment,
            List<LayerAnalysis> analyses
    ) {

        List<LayerResponse> layers =
                analyses.stream()
                        .map(this::toLayerResponse)
                        .toList();

        LayerAnalysis workloadLayer =
                analyses.stream()
                        .filter(layer ->
                                layer.getLayer() == LayerType.WORKLOAD
                        )
                        .findFirst()
                        .orElseThrow(() ->
                                new IllegalStateException(
                                        "Workload layer not found."
                                )
                        );

        BigDecimal effectiveCapacityMw =
                workloadLayer.getOutputMw();

        BigDecimal strandedMw =
                assessment.getFacilityMw()
                        .subtract(effectiveCapacityMw);

        BigDecimal strandedPercent =
                strandedMw
                        .divide(
                                assessment.getFacilityMw(),
                                6,
                                RoundingMode.HALF_UP
                        )
                        .multiply(BigDecimal.valueOf(100));

        return new LayerAnalysisResponse(
                assessment.getId(),
                layers,
                strandedMw,
                strandedPercent
        );
    }

    private LayerResponse toLayerResponse(
            LayerAnalysis layer
    ) {

        List<LossFactorResponse> lossFactors =
                layer.getLossFactors()
                        .stream()
                        .map(this::toLossFactorResponse)
                        .toList();

        return new LayerResponse(
                layer.getLayer(),
                layer.getInputMw(),
                layer.getOutputMw(),
                layer.getLossMw(),
                layer.getLossPercent(),
                layer.getDisplayOrder(),
                lossFactors
        );
    }

    private LossFactorResponse toLossFactorResponse(
            LossFactor lossFactor
    ) {

        return new LossFactorResponse(
                lossFactor.getFactor(),
                lossFactor.getImpactPercent(),
                lossFactor.getImpactMw()
        );
    }
}
