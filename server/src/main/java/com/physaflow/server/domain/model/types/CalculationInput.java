package com.physaflow.server.domain.model.types;

import com.physaflow.server.domain.model.enums.CoolingType;

import java.math.BigDecimal;

public record CalculationInput(
        BigDecimal facilityMw,
        BigDecimal utilization,
        CoolingType coolingType
) {
}