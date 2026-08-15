package com.physaflow.server.application.controller;

import com.physaflow.server.application.dto.layeranalysis.LayerAnalysisResponse;
import com.physaflow.server.domain.service.LayerAnalysisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/assessments/{assessmentId}/layer-analysis")
@RequiredArgsConstructor
@Tag(name = "Layer Analysis", description = "Endpoints for calculed of layer analysis")
@SecurityRequirement(name = "Bearer Authentication")
public class LayerAnalysisController {

    private final LayerAnalysisService layerAnalysisService;

    @PostMapping
    @Operation(
            summary = "Calculate layer analysis",
            description = "Calculates and persists the facility, IT and workload layer analysis for an assessment."
    )
    public ResponseEntity<LayerAnalysisResponse> calculateLayerAnalysis(
            @PathVariable UUID assessmentId
    ) {

        LayerAnalysisResponse response =
                layerAnalysisService.calculateAndPersist(
                        assessmentId
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping()
    @Operation(
            summary = "Get layer analysis",
            description = "Retrieves the previously calculated layer analysis for an assessment."
    )
    public ResponseEntity<LayerAnalysisResponse> getLayerAnalysis(
            @PathVariable UUID assessmentId
    ) {

        LayerAnalysisResponse response =
                layerAnalysisService.getByAssessmentId(
                        assessmentId
                );

        return ResponseEntity.ok(response);
    }
}


