package com.physaflow.server.application.dto.calculation;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record EstimateRequest(
        @NotNull(message = "Total Capacity MW is mandatory")
        @DecimalMin(value = "50.00", message = "Capacity must be strictly greater than 0")
        BigDecimal totalCapacityMw,

        @NotNull(message = "Utilization percentage is mandatory")
        @DecimalMin(value = "0.00", message = "Utilization cannot be negative")
        @DecimalMax(value = "75", message = "Utilization cannot exceed 100%")
        BigDecimal utilizationPct,

        @NotBlank(message = "Cooling type is mandatory (air, liquid, immersion, hybrid)")
        String coolingType
) {}