package com.physaflow.server.application.controller;

import com.physaflow.server.application.dto.assessment.AssessmentInitializeResponse;
import com.physaflow.server.application.dto.assessment.AssessmentRequest;
import com.physaflow.server.application.dto.assessment.AssessmentResultResponse;
import com.physaflow.server.domain.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/assessments")
@RequiredArgsConstructor
@Validated
public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<AssessmentResultResponse> createAssessment(
            @Valid @RequestBody AssessmentRequest request) {

        log.info("Recibida petición HTTP POST para inicializar Assessment. Facility MW: {}", request.facilityMw());

        // 1. Inicializa y persiste el assessment base
        AssessmentInitializeResponse response = assessmentService.saveAssessment(request);

        // 2. Construye la URI del recurso creado para la cabecera Location
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/v1/assessments/{id}")
                .buildAndExpand(response.id())
                .toUri();

        // 3. Ejecuta el motor matemático y persiste el resultado
        AssessmentResultResponse assessmentResult = assessmentService.calculateAndSaveResult(response.id());

        // 4. Retorna 201 Created con Location y el payload de resultados
        return ResponseEntity.created(location).body(assessmentResult);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentResultResponse> getAssessmentResult(
            @PathVariable("id") UUID id) {

        log.info("Recibida petición HTTP GET para consultar resultado de Assessment ID: {}", id);

        // Recupera el resultado previamente calculado para satisfacer la cabecera Location
        AssessmentResultResponse assessmentResult = assessmentService.getResultByAssessmentId(id);

        return ResponseEntity.ok(assessmentResult);
    }
}