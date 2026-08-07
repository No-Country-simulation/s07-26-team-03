package com.physaflow.server.application.controller.calculation;

/*
 * =====================================================================
 * TEMPORARILY DISABLED — referencias a la entidad eliminada `Calculation`.
 *
 * Este controlador se restaurará cuando el motor de cálculo sea
 * refactorizado al nuevo modelo: Assessment + AssessmentResult +
 * LayerAnalysis (ver rama feat/create-entities).
 *
 * Código original preservado como referencia. Descomentar y migrar
 * los tipos cuando se implemente el flujo del Assessment Form.
 * =====================================================================
 *
 * import com.physaflow.server.application.dto.calculation.EstimateRequest;
 * import com.physaflow.server.application.dto.calculation.EstimateResponse;
 * import com.physaflow.server.application.mapper.CalculatorMapper;
 * import com.physaflow.server.domain.command.AssessmentCommand;
 * import com.physaflow.server.domain.model.Calculation;
 * import com.physaflow.server.domain.service.calculation.CalculatorService;
 * import jakarta.validation.Valid;
 * import lombok.RequiredArgsConstructor;
 * import lombok.extern.slf4j.Slf4j;
 * import org.springframework.http.HttpStatus;
 * import org.springframework.http.ResponseEntity;
 * import org.springframework.web.bind.annotation.PostMapping;
 * import org.springframework.web.bind.annotation.RequestBody;
 * import org.springframework.web.bind.annotation.RequestMapping;
 * import org.springframework.web.bind.annotation.RestController;
 *
 * @Slf4j
 * @RestController
 * @RequestMapping("/api/v1/calculator")
 * @RequiredArgsConstructor
 * public class CalculatorController {
 *
 *     private final CalculatorService calculatorService;
 *     private final CalculatorMapper calculatorMapper;
 *
 *     @PostMapping("/estimate")
 *     public ResponseEntity<EstimateResponse> estimateStrandedCapacity(
 *             @Valid @RequestBody EstimateRequest request) {
 *         log.info("Received estimation request for Total Capacity: {} MW", request.totalCapacityMw());
 *         AssessmentCommand command = calculatorMapper.toCommand(request);
 *         Calculation calculation = calculatorService.processInitialAssessment(command);
 *         EstimateResponse response = calculatorMapper.toResponse(calculation);
 *         return ResponseEntity.status(HttpStatus.CREATED).body(response);
 *     }
 * }
 */
class CalculatorControllerPlaceholder {}
