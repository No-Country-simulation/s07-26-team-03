package com.physaflow.server.application.dto.layeranalysis;

import java.math.BigDecimal;

public record LossFactorResponse(
        String factor,
        BigDecimal impactPercent,
        BigDecimal impactMw
) {;
}