package com.physaflow.server.domain.model.types;

import com.physaflow.server.domain.model.enums.LayerType;

import java.math.BigDecimal;
import java.util.List;

public record LayerCalculationResult(
        LayerType layer,
        BigDecimal inputMw,
        BigDecimal outputMw,
        BigDecimal lossMw,
        BigDecimal lossPercent,
        Integer displayOrder,
        List<LossFactorCalculationResult> lossFactors
) {
}
