package com.physaflow.server.application.dto.scenario;

import com.physaflow.server.domain.model.enums.CapacityScore;
import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.ScenarioType;

import java.math.BigDecimal;
import java.util.UUID;

public record ScenarioItemResponse(
        UUID id,
        String name,
        ScenarioType type,
        Integer sortOrder,

        BigDecimal facilityMw,
        BigDecimal utilization,
        CoolingType coolingType,

        BigDecimal strandedMw,
        BigDecimal strandedPercent,

        BigDecimal annualCostMin,
        BigDecimal annualCostMax,

        CapacityScore capacityScore
) {
}