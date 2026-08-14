package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.LayerAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LayerAnalysisRepository extends JpaRepository<LayerAnalysis, UUID> {

    List<LayerAnalysis> findByAssessmentIdOrderByDisplayOrderAsc(UUID assessmentId);

    boolean existsByAssessmentId(UUID assessmentId);

    void deleteByAssessmentId(UUID assessmentId);

}