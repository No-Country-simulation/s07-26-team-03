package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.model.CalculationConfiguration;
import com.physaflow.server.domain.model.types.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;



@Service
public class CalculationEngine {

    private static final int SCALE = 6;

    private static final BigDecimal HUNDRED =
            BigDecimal.valueOf(100);

    private final LayerCalculationService layerCalculationService;
    private final FinancialCalculationService financialCalculationService;
    private final CapacityScoreCalculationService capacityScoreService;
    private final RecommendationCalculationService recommendationService;

    public CalculationEngine(
            LayerCalculationService layerCalculationService,
            FinancialCalculationService financialCalculationService,
            CapacityScoreCalculationService capacityScoreService,
            RecommendationCalculationService recommendationService
    ) {
        this.layerCalculationService = layerCalculationService;
        this.financialCalculationService = financialCalculationService;
        this.capacityScoreService = capacityScoreService;
        this.recommendationService = recommendationService;
    }

    public CalculationResult calculate(
            CalculationInput input,
            CalculationConfiguration configuration
    ) {

        validateInput(input);

        /*
         * ============================================================
         * 1. LAYER ANALYSIS
         * ============================================================
         */

        LayerAnalysisCalculationResult layerAnalysis =
                layerCalculationService.calculate(
                        input,
                        configuration
                );

        BigDecimal effectiveCapacityMw =
                layerAnalysis.effectiveCapacityMw();

        BigDecimal strandedMw =
                layerAnalysis.strandedMw();

        /*
         * ============================================================
         * 2. STRANDED PERCENT
         * ============================================================
         */

        BigDecimal strandedPercent =
                calculateStrandedPercent(
                        strandedMw,
                        input.facilityMw()
                );

        /*
         * ============================================================
         * 3. FINANCIAL
         * ============================================================
         */

        FinancialCalculationResult financial =
                financialCalculationService.calculate(
                        strandedMw,
                        configuration
                );

        /*
         * ============================================================
         * 4. CAPACITY SCORE
         * ============================================================
         */

        CapacityScoreResult capacityScore =
                capacityScoreService.calculateScore(
                        strandedPercent
                );

        // ============================================================
        // 5. RECOMMENDATION
        // ============================================================

        RecommendationData recommendation =
                recommendationService.calculate(
                        capacityScore.tier()
                );

        return new CalculationResult(
                layerAnalysis,
                effectiveCapacityMw,
                strandedMw,
                strandedPercent,
                financial.annualEnergyLossKwh(),
                financial.annualCost(),
                financial.annualCostMin(),
                financial.annualCostMax(),
                capacityScore,
                recommendation
        );
    }


    private BigDecimal calculateStrandedPercent(
            BigDecimal strandedMw,
            BigDecimal facilityMw
    ) {

        if (facilityMw.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return strandedMw
                .divide(
                        facilityMw,
                        SCALE,
                        RoundingMode.HALF_UP
                )
                .multiply(HUNDRED)
                .setScale(2, RoundingMode.HALF_UP);
    }

    private void validateInput(
            CalculationInput input
    ) {

        if (input == null) {
            throw new IllegalArgumentException(
                    "Calculation input cannot be null."
            );
        }

        if (input.facilityMw() == null ||
                input.facilityMw().compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Facility MW must be greater than zero."
            );
        }

        if (input.utilization() == null ||
                input.utilization().compareTo(BigDecimal.ZERO) < 0 ||
                input.utilization().compareTo(HUNDRED) > 0) {

            throw new IllegalArgumentException(
                    "Utilization must be between 0 and 100."
            );
        }

        if (input.coolingType() == null) {

            throw new IllegalArgumentException(
                    "Cooling type cannot be null."
            );
        }
    }
}