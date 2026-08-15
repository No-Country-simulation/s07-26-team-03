package com.physaflow.server.domain.service.calculation;

import java.math.BigDecimal;

public final class LossDistributionWeights {

    private LossDistributionWeights() {
    }

    public static final BigDecimal FACILITY_COOLING =
            new BigDecimal("0.40");

    public static final BigDecimal FACILITY_POWER_DISTRIBUTION =
            new BigDecimal("0.35");

    public static final BigDecimal FACILITY_UNUSED_CAPACITY =
            new BigDecimal("0.25");


    public static final BigDecimal IT_OVER_PROVISIONING =
            new BigDecimal("0.40");

    public static final BigDecimal IT_UNDERUTILIZED_SERVERS =
            new BigDecimal("0.35");

    public static final BigDecimal IT_NETWORK_INEFFICIENCY =
            new BigDecimal("0.25");


    public static final BigDecimal WORKLOAD_IDLE =
            new BigDecimal("0.40");

    public static final BigDecimal WORKLOAD_POOR_SCHEDULING =
            new BigDecimal("0.35");

    public static final BigDecimal WORKLOAD_GHOST_VMS =
            new BigDecimal("0.25");
}