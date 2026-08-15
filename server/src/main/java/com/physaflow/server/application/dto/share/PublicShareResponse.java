package com.physaflow.server.application.dto.share;

import com.physaflow.server.domain.model.enums.CoolingType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record PublicShareResponse(
        UUID assessmentId,
        BigDecimal facilityMw,
        BigDecimal utilization,
        CoolingType coolingType,
        BigDecimal strandedPercent,
        BigDecimal strandedMw,
        BigDecimal annualCostMin,
        BigDecimal annualCostMax,
        String capacityScore,
        String recommendationSummary,
        String algorithmVersion,
        LocalDateTime calculatedAt
) {
}
