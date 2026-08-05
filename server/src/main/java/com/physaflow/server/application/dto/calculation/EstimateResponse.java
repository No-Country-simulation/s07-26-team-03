package com.physaflow.server.application.dto.calculation;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record EstimateResponse(
        String id,
        BigDecimal strandedMw,
        BigDecimal strandedPct,
        BigDecimal wasteUsdLow,
        BigDecimal wasteUsdHigh,
        OffsetDateTime createdAt
) {}