package com.physaflow.server.application.dto.assessment;

import com.physaflow.server.domain.model.enums.CoolingType;

import java.math.BigDecimal;
import java.util.UUID;
import java.time.LocalDateTime;

public record AssessmentResultResponse(
        UUID id,
        UUID configurationId,
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
) {}