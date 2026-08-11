package com.physaflow.server.application.dto.assessment;

import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.UtilizationLevel;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

public record AssessmentRequest(

        UUID sessionId,

        UUID leadId,

        @NotNull(message = "Facility capacity in MW is required")
        @DecimalMin(value = "0.1", inclusive = false, message = "Facility MW must be strictly greater than 0")
        BigDecimal facilityMw,

        @NotNull(message = "El porcentaje de utilización es obligatorio.")
        @DecimalMin(value = "0.00", inclusive = true, message = "El porcentaje de utilización no puede ser menor a 0.00%.")
        @DecimalMax(value = "100.00", inclusive = true, message = "El porcentaje de utilización no puede superar el 100.00%.")
        @Digits(integer = 3, fraction = 2, message = "Formato inválido para utilization (máximo 3 enteros y 2 decimales).")
        BigDecimal utilization,

        @NotNull(message = "Cooling type is required")
        CoolingType coolingType
) {}