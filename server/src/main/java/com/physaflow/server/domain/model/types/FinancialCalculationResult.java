package com.physaflow.server.domain.model.types;

import java.math.BigDecimal;

public record FinancialCalculationResult(

        BigDecimal strandedMw,

        BigDecimal annualEnergyLossKwh,

        BigDecimal annualCost,

        BigDecimal annualCostMin,

        BigDecimal annualCostMax

) {
}