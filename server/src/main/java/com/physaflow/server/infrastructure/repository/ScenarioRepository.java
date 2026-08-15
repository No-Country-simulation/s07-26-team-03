package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.Scenario;
import com.physaflow.server.domain.model.enums.ScenarioType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ScenarioRepository extends JpaRepository<Scenario, UUID> {

    @EntityGraph(attributePaths = {"result"})
    List<Scenario> findByAssessmentIdOrderBySortOrderAsc(
            UUID assessmentId
    );

    Optional<Scenario> findByAssessmentIdAndType(
            UUID assessmentId,
            ScenarioType type
    );

    boolean existsByAssessmentIdAndType(
            UUID assessmentId,
            ScenarioType type
    );
}