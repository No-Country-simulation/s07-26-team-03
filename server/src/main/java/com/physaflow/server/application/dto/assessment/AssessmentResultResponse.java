package com.physaflow.server.application.dto.assessment;

import java.math.BigDecimal;
import java.util.UUID;
import java.time.LocalDateTime;

public record AssessmentResultResponse(
        UUID id,
        UUID assessmentId,
        UUID configurationId,
        BigDecimal strandedPercent,
        BigDecimal strandedMw,
        BigDecimal annualCostMin,
        BigDecimal annualCostMax,
        String capacityScore,
        String recommendationSummary,
        String algorithmVersion,
        LocalDateTime calculatedAt
) {}