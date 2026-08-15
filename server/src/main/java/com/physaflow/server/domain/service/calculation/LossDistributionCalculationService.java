package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.model.types.LossFactorCalculationResult;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class LossDistributionCalculationService {

    private static final BigDecimal HUNDRED =
            BigDecimal.valueOf(100);

    private static final int SCALE = 6;

    public List<LossFactorCalculationResult> calculateFacilityLossFactors(
            BigDecimal facilityLossMw
    ) {

        return List.of(

                createFactor(
                        "Cooling",
                        facilityLossMw,
                        LossDistributionWeights.FACILITY_COOLING
                ),

                createFactor(
                        "Power distribution",
                        facilityLossMw,
                        LossDistributionWeights.FACILITY_POWER_DISTRIBUTION
                ),

                createFactor(
                        "Unused capacity",
                        facilityLossMw,
                        LossDistributionWeights.FACILITY_UNUSED_CAPACITY
                )
        );
    }

    public List<LossFactorCalculationResult> calculateItLossFactors(
            BigDecimal itLossMw
    ) {

        return List.of(

                createFactor(
                        "Over provisioning",
                        itLossMw,
                        LossDistributionWeights.IT_OVER_PROVISIONING
                ),

                createFactor(
                        "Underutilized servers",
                        itLossMw,
                        LossDistributionWeights.IT_UNDERUTILIZED_SERVERS
                ),

                createFactor(
                        "Network inefficiency",
                        itLossMw,
                        LossDistributionWeights.IT_NETWORK_INEFFICIENCY
                )
        );
    }

    public List<LossFactorCalculationResult> calculateWorkloadLossFactors(
            BigDecimal workloadLossMw
    ) {

        return List.of(

                createFactor(
                        "Idle workloads",
                        workloadLossMw,
                        LossDistributionWeights.WORKLOAD_IDLE
                ),

                createFactor(
                        "Poor scheduling",
                        workloadLossMw,
                        LossDistributionWeights.WORKLOAD_POOR_SCHEDULING
                ),

                createFactor(
                        "Ghost VMs",
                        workloadLossMw,
                        LossDistributionWeights.WORKLOAD_GHOST_VMS
                )
        );
    }

    private LossFactorCalculationResult createFactor(
            String factor,
            BigDecimal layerLossMw,
            BigDecimal weight
    ) {

        BigDecimal impactMw =
                layerLossMw.multiply(weight);

        BigDecimal impactPercent =
                weight.multiply(HUNDRED);

        return new LossFactorCalculationResult(
                factor,
                impactPercent.setScale(
                        2,
                        RoundingMode.HALF_UP
                ),
                impactMw.setScale(
                        2,
                        RoundingMode.HALF_UP
                )
        );
    }
}