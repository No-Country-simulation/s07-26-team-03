package com.physaflow.server.domain.command;

import java.math.BigDecimal;

/**
 * Representa la intención pura e inmutable de negocio para calcular la capacidad varada.
 * Desacoplado de la capa web. Al ser un Record, expone nativamente los accesores:
 * totalCapacityMw(), utilizationPct() y coolingType().
 */
public record AssessmentCommand(
        BigDecimal totalCapacityMw,
        BigDecimal utilizationPct,
        String coolingType
) {}