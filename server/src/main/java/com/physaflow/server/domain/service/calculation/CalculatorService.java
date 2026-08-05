package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.command.AssessmentCommand;
import com.physaflow.server.domain.model.Calculation;

/**
 * Contrato del motor analítico para el cálculo de capacidad varada.
 * Aislado de la capa web y de la persistencia.
 */
public interface CalculatorService {

    /**
     * Procesa la estimación inicial del Assessment Form (Sprint 1).
     *
     * @param command Objeto inmutable (Record) con los parámetros físicos.
     * @return Entidad Calculation persistida, con el token/ID viral generado.
     */
    Calculation processInitialAssessment(AssessmentCommand command);
}