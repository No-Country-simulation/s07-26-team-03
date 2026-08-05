package com.physaflow.server.application.controller.calculation;

import com.physaflow.server.application.dto.calculation.EstimateRequest;
import com.physaflow.server.application.dto.calculation.EstimateResponse;
import com.physaflow.server.application.mapper.CalculatorMapper;
import com.physaflow.server.domain.command.AssessmentCommand;
import com.physaflow.server.domain.model.Calculation;
import com.physaflow.server.domain.service.calculation.CalculatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/calculator")
@RequiredArgsConstructor
public class CalculatorController {

    private final CalculatorService calculatorService;
    private final CalculatorMapper calculatorMapper;

    /**
     * Endpoint crítico para el Assessment Form.
     * Procesa instantáneamente el cálculo de capacidad varada y desperdicio financiero.
     *
     * @param request Payload validado con los parámetros físicos y de costos.
     * @return ResponseEntity con el EstimateResponse y enlace compartible (HTTP 201 Created).
     */
    @PostMapping("/estimate")
    public ResponseEntity<EstimateResponse> estimateStrandedCapacity(
            @Valid @RequestBody EstimateRequest request) {

        log.info("Received estimation request for Total Capacity: {} MW", request.totalCapacityMw());

        // 1. Mapeo de DTO de presentación hacia Command de dominio (inmutable)
        AssessmentCommand command = calculatorMapper.toCommand(request);

        // 2. Ejecución de la lógica de negocio transaccional en el servicio
        Calculation calculation = calculatorService.processInitialAssessment(command);

        // 3. Transformación de Entidad JPA hacia DTO de respuesta
        EstimateResponse response = calculatorMapper.toResponse(calculation);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}