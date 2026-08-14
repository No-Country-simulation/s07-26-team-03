package com.physaflow.server.domain.model.types;

import java.math.BigDecimal;
import java.util.List;

public record LayerAnalysisCalculationResult(
        List<LayerCalculationResult> layers,
        BigDecimal effectiveCapacityMw,
        BigDecimal strandedMw
) {
}

