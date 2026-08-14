package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.CalculationConfiguration;
import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.LayerType;
import com.physaflow.server.domain.model.types.LayerAnalysisCalculationResult;
import com.physaflow.server.domain.model.types.LayerCalculationResult;
import com.physaflow.server.domain.model.types.LossFactorCalculationResult;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class LayerAnalysisCalculationEngine {

    private static final int SCALE = 6;

    private static final BigDecimal ONE =
            BigDecimal.ONE;

    private static final BigDecimal HUNDRED =
            BigDecimal.valueOf(100);

    private static final BigDecimal ASSERTION_TOLERANCE =
            new BigDecimal("0.0001");

    private final LossDistributionCalculationService lossDistributionCalculationService;

    public LayerAnalysisCalculationEngine(LossDistributionCalculationService lossDistributionCalculationService) {
        this.lossDistributionCalculationService = lossDistributionCalculationService;
    }

    public LayerAnalysisCalculationResult calculate(
            Assessment assessment,
            CalculationConfiguration configuration
    ) {

        BigDecimal facilityMw =
                assessment.getFacilityMw();

        BigDecimal utilizationDecimal =
                assessment.getUtilization()
                        .divide(
                                HUNDRED,
                                SCALE,
                                RoundingMode.HALF_UP
                        );

        BigDecimal coolingFactor =
                getCoolingFactor(
                        assessment.getCoolingType(),
                        configuration
                );

        // ============================================================
        // FACILITY
        // ============================================================

        BigDecimal facilityInputMw =
                facilityMw;

        BigDecimal facilityOutputMw =
                facilityInputMw
                        .multiply(
                                configuration.getFacilityEfficiency()
                        )
                        .multiply(coolingFactor);

        BigDecimal facilityLossMw =
                facilityInputMw.subtract(
                        facilityOutputMw
                );

        BigDecimal facilityLossPercent =
                calculateLossPercent(
                        facilityLossMw,
                        facilityInputMw
                );

        List<LossFactorCalculationResult> facilityFactors =
                lossDistributionCalculationService
                        .calculateFacilityLossFactors(
                                facilityLossMw
                        );

        LayerCalculationResult facility =
                new LayerCalculationResult(
                        LayerType.FACILITY,
                        round(facilityInputMw),
                        round(facilityOutputMw),
                        round(facilityLossMw),
                        round(facilityLossPercent),
                        1,
                        facilityFactors
                );

        // ============================================================
        // IT
        // ============================================================

        BigDecimal itInputMw =
                facilityOutputMw;

        BigDecimal itOutputMw =
                itInputMw
                        .multiply(
                                configuration.getItEfficiency()
                        );

        BigDecimal itLossMw =
                itInputMw.subtract(
                        itOutputMw
                );

        BigDecimal itLossPercent =
                calculateLossPercent(
                        itLossMw,
                        itInputMw
                );

        List<LossFactorCalculationResult> itFactors =
                lossDistributionCalculationService
                        .calculateItLossFactors(
                                itLossMw
                        );

        LayerCalculationResult it =
                new LayerCalculationResult(
                        LayerType.IT,
                        round(itInputMw),
                        round(itOutputMw),
                        round(itLossMw),
                        round(itLossPercent),
                        2,
                        itFactors
                );

        // ============================================================
        // WORKLOAD
        // ============================================================

        BigDecimal workloadInputMw =
                itOutputMw;

        BigDecimal workloadOutputMw =
                workloadInputMw
                        .multiply(
                                configuration.getWorkloadEfficiency()
                        )
                        .multiply(utilizationDecimal);

        BigDecimal workloadLossMw =
                workloadInputMw.subtract(
                        workloadOutputMw
                );

        BigDecimal workloadLossPercent =
                calculateLossPercent(
                        workloadLossMw,
                        workloadInputMw
                );

        List<LossFactorCalculationResult> workloadFactors =
                lossDistributionCalculationService
                        .calculateWorkloadLossFactors(
                                workloadLossMw
                        );

        LayerCalculationResult workload =
                new LayerCalculationResult(
                        LayerType.WORKLOAD,
                        round(workloadInputMw),
                        round(workloadOutputMw),
                        round(workloadLossMw),
                        round(workloadLossPercent),
                        3,
                        workloadFactors
                );

        // ============================================================
        // TOTAL
        // ============================================================

        BigDecimal effectiveCapacityMw =
                workloadOutputMw;

        BigDecimal strandedMw =
                facilityLossMw
                        .add(itLossMw)
                        .add(workloadLossMw);

        BigDecimal expectedStrandedMw =
                facilityMw.subtract(
                        effectiveCapacityMw
                );

        validateCalculationConsistency(
                strandedMw,
                expectedStrandedMw
        );

        return new LayerAnalysisCalculationResult(
                List.of(
                        facility,
                        it,
                        workload
                ),
                round(effectiveCapacityMw),
                round(strandedMw)
        );

    }

    private BigDecimal getCoolingFactor(
            CoolingType coolingType,
            CalculationConfiguration configuration
    ) {

        return switch (coolingType) {

            case AIR ->
                    configuration.getAirCoolingFactor();

            case HYBRID ->
                    configuration.getChilledWaterFactor();

            case LIQUID ->
                    configuration.getLiquidCoolingFactor();

            case INMERSION ->
                    configuration.getInmersionCoolingFactor();
        };
    }


    private BigDecimal calculateLossPercent(
            BigDecimal lossMw,
            BigDecimal inputMw
    ) {

        if (inputMw.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return lossMw
                .divide(inputMw, SCALE, RoundingMode.HALF_UP)
                .multiply(HUNDRED);
    }

    private List<LossFactorCalculationResult> calculateFacilityLossFactors(
            BigDecimal inputMw,
            BigDecimal facilityEfficiency,
            BigDecimal coolingFactor
    ) {

        /*
         * First loss: facility efficiency
         */
        BigDecimal afterEfficiency =
                inputMw.multiply(facilityEfficiency);

        BigDecimal efficiencyLoss =
                inputMw.subtract(afterEfficiency);

        /*
         * Second loss: cooling
         */
        BigDecimal coolingLoss =
                afterEfficiency.subtract(
                        afterEfficiency.multiply(coolingFactor)
                );

        BigDecimal efficiencyImpact =
                calculateLossPercent(
                        efficiencyLoss,
                        inputMw
                );

        BigDecimal coolingImpact =
                calculateLossPercent(
                        coolingLoss,
                        inputMw
                );

        List<LossFactorCalculationResult> factors =
                new ArrayList<>();

        factors.add(
                new LossFactorCalculationResult(
                        "Facility efficiency",
                        round(efficiencyImpact),
                        round(efficiencyLoss)
                )
        );

        factors.add(
                new LossFactorCalculationResult(
                        "Cooling",
                        round(coolingImpact),
                        round(coolingLoss)
                )
        );

        return factors;
    }

    private List<LossFactorCalculationResult> calculateWorkloadLossFactors(
            BigDecimal inputMw,
            BigDecimal workloadEfficiency,
            BigDecimal utilizationDecimal
    ) {

        BigDecimal afterEfficiency =
                inputMw.multiply(workloadEfficiency);

        BigDecimal efficiencyLoss =
                inputMw.subtract(afterEfficiency);

        BigDecimal utilizationLoss =
                afterEfficiency.subtract(
                        afterEfficiency.multiply(utilizationDecimal)
                );

        BigDecimal efficiencyImpact =
                calculateLossPercent(
                        efficiencyLoss,
                        inputMw
                );

        BigDecimal utilizationImpact =
                calculateLossPercent(
                        utilizationLoss,
                        inputMw
                );

        return List.of(

                new LossFactorCalculationResult(
                        "Workload efficiency",
                        round(efficiencyImpact),
                        round(efficiencyLoss)
                ),

                new LossFactorCalculationResult(
                        "Utilization",
                        round(utilizationImpact),
                        round(utilizationLoss)
                )
        );
    }

    private void validateCalculationConsistency(
            BigDecimal strandedMw,
            BigDecimal expectedStrandedMw
    ) {

        BigDecimal difference =
                strandedMw.subtract(expectedStrandedMw).abs();

        if (difference.compareTo(ASSERTION_TOLERANCE) > 0) {

            throw new IllegalStateException(
                    String.format(
                            "Layer analysis calculation is inconsistent. Expected stranded capacity: %s, calculated: %s",
                            expectedStrandedMw,
                            strandedMw
                    )
            );
        }
    }

    private BigDecimal round(BigDecimal value) {

        return value.setScale(
                2,
                RoundingMode.HALF_UP
        );
    }
}