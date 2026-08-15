package com.physaflow.server.application.controller;

import com.physaflow.server.application.dto.scenario.ScenarioResponse;
import com.physaflow.server.domain.service.scenarios.ScenarioService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class ScenarioController {


    private final ScenarioService scenarioService;


    /**
     * Generates the predefined scenarios for an assessment,
     * calculates their results and returns:
     *
     * CURRENT_STATE
     * SCENARIO_1
     * SCENARIO_2
     */
    @PostMapping("/{assessmentId}/scenarios")
    public ResponseEntity<ScenarioResponse> generateScenarios(
            @PathVariable UUID assessmentId
    ) {

        ScenarioResponse response =
                scenarioService.generateScenarios(
                        assessmentId
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    /**
     * Returns the previously generated scenarios
     * and their calculated results.
     */
    @GetMapping("/{assessmentId}/scenarios")
    public ResponseEntity<ScenarioResponse> getScenarios(
            @PathVariable UUID assessmentId
    ) {

        ScenarioResponse response =
                scenarioService.getScenarios(
                        assessmentId
                );

        return ResponseEntity.ok(
                response
        );
    }
}
