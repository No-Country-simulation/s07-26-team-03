package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.model.CalculationConfiguration;
import com.physaflow.server.domain.model.types.FinancialCalculationResult;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class FinancialCalculationService {

    private static final int SCALE = 6;

    private static final BigDecimal MW_TO_KW =
            new BigDecimal("1000");

    private static final BigDecimal MIN_COST_FACTOR =
            new BigDecimal("0.90");

    private static final BigDecimal MAX_COST_FACTOR =
            new BigDecimal("1.10");

    public FinancialCalculationResult calculate(
            BigDecimal strandedMw,
            CalculationConfiguration configuration
    ) {

        BigDecimal annualEnergyLossKwh =
                strandedMw
                        .multiply(MW_TO_KW)
                        .multiply(configuration.getHoursPerYear())
                        .setScale(SCALE, RoundingMode.HALF_UP);

        BigDecimal annualCost =
                annualEnergyLossKwh
                        .multiply(configuration.getEnergyPricePerKwh())
                        .setScale(2, RoundingMode.HALF_UP);

        BigDecimal annualCostMin =
                annualCost
                        .multiply(MIN_COST_FACTOR)
                        .setScale(2, RoundingMode.HALF_UP);

        BigDecimal annualCostMax =
                annualCost
                        .multiply(MAX_COST_FACTOR)
                        .setScale(2, RoundingMode.HALF_UP);

        return new FinancialCalculationResult(
                strandedMw.setScale(2, RoundingMode.HALF_UP),
                annualEnergyLossKwh,
                annualCost,
                annualCostMin,
                annualCostMax
        );
    }

    private BigDecimal round(BigDecimal value) {
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}