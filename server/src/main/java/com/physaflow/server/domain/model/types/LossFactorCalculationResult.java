package com.physaflow.server.domain.model.types;

import java.math.BigDecimal;

public record LossFactorCalculationResult(
        String factor,
        BigDecimal impactPercent,
        BigDecimal impactMw
) {
}
