package com.physaflow.server.application.dto.error;

import java.time.OffsetDateTime;
import java.util.Map;

/**
 * Estructura estándar para respuestas de error de la API.
 */
public record ApiErrorResponse(
        int status,
        String error,
        String message,
        Map<String, String> validationErrors,
        OffsetDateTime timestamp
) {}