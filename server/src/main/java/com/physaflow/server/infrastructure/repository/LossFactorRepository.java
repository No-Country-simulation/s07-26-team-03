package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.LossFactor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LossFactorRepository extends JpaRepository<LossFactor, UUID> {

    void deleteByLayerAnalysisAssessmentId(UUID assessmentId);
}