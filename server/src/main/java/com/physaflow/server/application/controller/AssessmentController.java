package com.physaflow.server.application.controller;

import com.physaflow.server.application.dto.assessment.AssessmentInitializeResponse;
import com.physaflow.server.application.dto.assessment.AssessmentRequest;
import com.physaflow.server.domain.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/api/v1/assessments")
@RequiredArgsConstructor
@Validated
public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<AssessmentInitializeResponse> createAssessment(
            @Valid @RequestBody AssessmentRequest request) {

        log.info("Recibida petición HTTP POST para guardar Assessment. Facility MW: {}", request.facilityMw());

        AssessmentInitializeResponse response = assessmentService.saveAssessment(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/v1/assessments/{id}")
                .buildAndExpand(response.id())
                .toUri();

        log.debug("URI generada para el recurso guardado: {}", location);

        return ResponseEntity.created(location).body(response);
    }
}