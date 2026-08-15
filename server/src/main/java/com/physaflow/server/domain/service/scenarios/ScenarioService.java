package com.physaflow.server.domain.service.scenarios;

import com.physaflow.server.application.dto.scenario.ScenarioResponse;
import com.physaflow.server.application.exception.business.entity.EntityNotFoundException;
import com.physaflow.server.application.mapper.ScenarioMapper;
import com.physaflow.server.domain.model.*;
import com.physaflow.server.domain.model.types.CalculationInput;
import com.physaflow.server.domain.model.types.CalculationResult;
import com.physaflow.server.domain.service.AssessmentService;
import com.physaflow.server.domain.service.calculation.CalculationEngine;
import com.physaflow.server.infrastructure.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ScenarioService {

    private final AssessmentRepository assessmentRepository;

    private final AssessmentResultRepository assessmentResultRepository;

    private final CalculationConfigurationRepository
            calculationConfigurationRepository;

    private final ScenarioRepository scenarioRepository;

    private final ScenarioResultRepository scenarioResultRepository;

    private final ScenarioGenerator scenarioGenerator;

    private final CalculationEngine calculationEngine;

    private final ScenarioMapper scenarioMapper;

    private final AssessmentService assessmentService;


    /**
     * Generates the predefined scenarios for an assessment,
     * calculates their results and persists them.
     ** CURRENT_STATE is not persisted as a Scenario.
     * It is obtained from the existing AssessmentResult.
     */
    public ScenarioResponse generateScenarios(
            UUID assessmentId
    ) {

        /*
         * ============================================================
         * 1. LOAD ASSESSMENT
         * ============================================================
         */

        Assessment assessment =
                assessmentService.findByIdForCurrentUser(assessmentId);


        /*
         * ============================================================
         * 2. LOAD CURRENT STATE RESULT
         * ============================================================
         *
         * CURRENT_STATE already exists in AssessmentResult.
         *
         * We don't create a Scenario entity for it.
         */

        AssessmentResult currentResult =
                assessmentResultRepository
                        .findByAssessmentId(assessment.getId())
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Assessment result not found: "
                                                + assessment.getId()
                                )
                        );


        /*
         * ============================================================
         * 3. LOAD ACTIVE CONFIGURATION
         * ============================================================
         */

        CalculationConfiguration configuration =
                calculationConfigurationRepository
                        .findActiveConfiguration()
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Active calculation configuration "
                                                + "not found."
                                )
                        );


        /*
         * ============================================================
         * 4. CHECK EXISTING SCENARIOS
         * ============================================================
         *
         * Scenario generation is idempotent.
         *
         * If scenarios already exist, we don't create duplicates.
         */

        List<Scenario> existingScenarios =
                scenarioRepository
                        .findByAssessmentIdOrderBySortOrderAsc(
                                assessment.getId()
                        );

        if (!existingScenarios.isEmpty()) {

            return buildResponse(
                    assessment,
                    currentResult,
                    existingScenarios
            );
        }


        /*
         * ============================================================
         * 5. GENERATE SCENARIO INPUTS
         * ============================================================
         */

        List<Scenario> scenarios =
                scenarioGenerator.generate(
                        assessment,
                        configuration
                );


        /*
         * ============================================================
         * 6. PERSIST SCENARIO INPUTS
         * ============================================================
         */

        List<Scenario> savedScenarios =
                scenarioRepository.saveAll(
                        scenarios
                );


        /*
         * ============================================================
         * 7. CALCULATE + PERSIST RESULTS
         * ============================================================
         */

        calculateAndSaveResults(
                savedScenarios,
                configuration
        );


        /*
         * ============================================================
         * 8. BUILD RESPONSE
         * ============================================================
         */

        return buildResponse(
                assessment,
                currentResult,
                savedScenarios
        );
    }


    /**
     * Calculates the result of every generated scenario.
     */
    private void calculateAndSaveResults(
            List<Scenario> scenarios,
            CalculationConfiguration configuration
    ) {

        List<ScenarioResult> results =
                scenarios.stream()
                        .map(scenario ->
                                calculateScenarioResult(
                                        scenario,
                                        configuration
                                )
                        )
                        .toList();

        scenarioResultRepository.saveAll(
                results
        );
    }


    /**
     * Executes the generic calculation engine
     * using the Scenario input.
     */
    private ScenarioResult calculateScenarioResult(
            Scenario scenario,
            CalculationConfiguration configuration
    ) {

        CalculationInput input =
                new CalculationInput(
                        scenario.getFacilityMw(),
                        scenario.getUtilization(),
                        scenario.getCoolingType()
                );


        /*
         * The same calculation engine used by the
         * Assessment calculation.
         */
        CalculationResult calculation =
                calculationEngine.calculate(
                        input,
                        configuration
                );


        return ScenarioResult.builder()

                .scenario(scenario)

                .strandedPercent(
                        calculation.strandedPercent()
                )

                .strandedMw(
                        calculation.strandedMw()
                )

                .annualCostMin(
                        calculation.annualCostMin()
                )

                .annualCostMax(
                        calculation.annualCostMax()
                )

                .capacityScore(
                        calculation.capacityScore().score()
                )

                .build();
    }


    /**
     * Builds the response with:
     * 1. CURRENT_STATE
     * 2. SCENARIO_1
     * 3. SCENARIO_2
     */
    private ScenarioResponse buildResponse(
            Assessment assessment,
            AssessmentResult currentResult,
            List<Scenario> scenarios
    ) {

        List<ScenarioResult> scenarioResults =
                scenarioResultRepository
                        .findByScenarioAssessmentId(
                                assessment.getId()
                        );


        Map<UUID, ScenarioResult> resultsByScenarioId =
                scenarioResults.stream()
                        .collect(
                                Collectors.toMap(
                                        result ->
                                                result.getScenario().getId(),
                                        Function.identity()
                                )
                        );


        return scenarioMapper.toResponse(
                assessment,
                currentResult,
                scenarios,
                resultsByScenarioId
        );
    }


    /**
     * Retrieves previously generated scenarios
     * and their calculated results.
     */
    @Transactional(readOnly = true)
    public ScenarioResponse getScenarios(
            UUID assessmentId
    ) {

        Assessment assessment =
                assessmentRepository
                        .findById(assessmentId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Assessment not found: "
                                                + assessmentId
                                )
                        );


        AssessmentResult currentResult =
                assessmentResultRepository
                        .findByAssessmentId(assessmentId)
                        .orElseThrow(() ->
                                new EntityNotFoundException(
                                        "Assessment result not found: "
                                                + assessmentId
                                )
                        );


        List<Scenario> scenarios =
                scenarioRepository
                        .findByAssessmentIdOrderBySortOrderAsc(
                                assessmentId
                        );


        if (scenarios.isEmpty()) {

            throw new EntityNotFoundException(
                    "Scenarios have not been generated for assessment: "
                            + assessmentId
            );
        }


        return buildResponse(
                assessment,
                currentResult,
                scenarios
        );
    }
}