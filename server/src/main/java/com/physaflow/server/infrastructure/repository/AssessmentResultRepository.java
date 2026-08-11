package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssessmentResultRepository extends JpaRepository<AssessmentResult, UUID> {

    Optional<AssessmentResult> findByAssessmentId(UUID assessmentId);

    List<AssessmentResult> findAllByAssessmentIdOrderByCalculatedAtAsc(UUID assessmentId);
}