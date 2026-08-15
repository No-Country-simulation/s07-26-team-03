package com.physaflow.server.domain.model.types;

import com.physaflow.server.domain.model.enums.CapacityScore;

import java.math.BigDecimal;
import java.util.List;

public record CalculationResult(

        LayerAnalysisCalculationResult layerAnalysis,

        BigDecimal effectiveCapacityMw,

        BigDecimal strandedMw,

        BigDecimal strandedPercent,

        BigDecimal annualEnergyLossKwh,

        BigDecimal annualCost,

        BigDecimal annualCostMin,

        BigDecimal annualCostMax,

        CapacityScoreResult capacityScore,

        RecommendationData recommendationSummary
) {
}
