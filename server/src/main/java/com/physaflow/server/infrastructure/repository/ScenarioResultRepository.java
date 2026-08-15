package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.ScenarioResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ScenarioResultRepository
        extends JpaRepository<ScenarioResult, UUID> {

    List<ScenarioResult> findByScenarioAssessmentId(
            UUID assessmentId
    );

    Optional<ScenarioResult> findByScenarioId(
            UUID scenarioId
    );
}