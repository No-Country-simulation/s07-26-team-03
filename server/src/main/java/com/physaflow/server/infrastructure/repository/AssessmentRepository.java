package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, UUID> {

    Optional<Assessment> findByIdAndLeadId(
            UUID assessmentId,
            UUID leadId
    );

}