package com.physaflow.server.application.mapper;

import com.physaflow.server.application.dto.scenario.ScenarioItemResponse;
import com.physaflow.server.application.dto.scenario.ScenarioResponse;
import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.AssessmentResult;
import com.physaflow.server.domain.model.Scenario;
import com.physaflow.server.domain.model.ScenarioResult;
import com.physaflow.server.domain.model.enums.ScenarioType;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class ScenarioMapper {

    public ScenarioResponse toResponse(
            Assessment assessment,
            AssessmentResult currentResult,
            List<Scenario> scenarios,
            Map<UUID, ScenarioResult> resultsByScenarioId
    ) {

        List<ScenarioItemResponse> items =
                new ArrayList<>();

        /*
         * CURRENT STATE
         */
        items.add(
                toCurrentStateResponse(
                        assessment,
                        currentResult
                )
        );

        /*
         * GENERATED SCENARIOS
         */
        for (Scenario scenario : scenarios) {

            ScenarioResult result =
                    resultsByScenarioId.get(
                            scenario.getId()
                    );

            if (result == null) {
                throw new IllegalStateException(
                        "Scenario result not found for scenario: "
                                + scenario.getId()
                );
            }

            items.add(
                    toScenarioItemResponse(
                            scenario,
                            result
                    )
            );
        }

        return new ScenarioResponse(
                assessment.getId(),
                items
        );
    }

    /**
     * Maps the current assessment result into the
     * CURRENT_STATE scenario representation.
     *
     * No Scenario entity is created for CURRENT_STATE.
     */
    private ScenarioItemResponse toCurrentStateResponse(
            Assessment assessment,
            AssessmentResult result
    ) {

        return new ScenarioItemResponse(

                null,

                "Current State",

                ScenarioType.CURRENT_STATE,

                0,

                assessment.getFacilityMw(),
                assessment.getUtilization(),
                assessment.getCoolingType(),

                result.getStrandedMw(),
                result.getStrandedPercent(),

                result.getAnnualCostMin(),
                result.getAnnualCostMax(),

                result.getCapacityScore()
        );
    }

    /**
     * Maps a persisted Scenario and its calculated result.
     */
    private ScenarioItemResponse toScenarioItemResponse(
            Scenario scenario,
            ScenarioResult result
    ) {

        return new ScenarioItemResponse(

                scenario.getId(),

                scenario.getName(),

                scenario.getType(),

                scenario.getSortOrder(),

                scenario.getFacilityMw(),
                scenario.getUtilization(),
                scenario.getCoolingType(),

                result.getStrandedMw(),
                result.getStrandedPercent(),

                result.getAnnualCostMin(),
                result.getAnnualCostMax(),

                result.getCapacityScore()
        );
    }


}
