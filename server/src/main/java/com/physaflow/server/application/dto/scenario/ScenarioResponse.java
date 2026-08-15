package com.physaflow.server.application.dto.scenario;

import java.util.List;
import java.util.UUID;

public record ScenarioResponse(

        UUID assessmentId,

        List<ScenarioItemResponse> scenarios

) {
}