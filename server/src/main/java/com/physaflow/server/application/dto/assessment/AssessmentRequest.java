package com.physaflow.server.application.dto.assessment;

import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.UtilizationLevel;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

public record AssessmentRequest(

        @NotNull(message = "Session ID is required for client tracking")
        UUID sessionId,

        @NotNull(message = "Lead ID is required for client tracking")
        UUID leadId,

        @NotNull(message = "Facility capacity in MW is required")
        @DecimalMin(value = "0.1", inclusive = false, message = "Facility MW must be strictly greater than 0")
        BigDecimal facilityMw,

        @NotNull(message = "Utilization level is required")
        UtilizationLevel utilization,

        @NotNull(message = "Cooling type is required")
        CoolingType coolingType
) {}