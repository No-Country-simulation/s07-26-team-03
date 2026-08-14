package com.physaflow.server.domain.model.types;

import com.physaflow.server.domain.model.enums.CoolingType;

import java.math.BigDecimal;

public record LayerAnalysisCalculationInput(
        BigDecimal facilityMw,
        BigDecimal utilizationPercent,
        CoolingType coolingType,
        BigDecimal facilityEfficiency,
        BigDecimal itEfficiency,
        BigDecimal workloadEfficiency,
        BigDecimal coolingFactor
) {
}
