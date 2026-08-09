package com.physaflow.server.domain.service;

import com.physaflow.server.application.dto.assessment.AssessmentInitializeResponse;
import com.physaflow.server.application.dto.assessment.AssessmentRequest;
import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.enums.AssessmentStatus;
import com.physaflow.server.infrastructure.repository.AssessmentRepository;
import com.physaflow.server.infrastructure.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final LeadRepository leadRepository;

    @Transactional
    public AssessmentInitializeResponse saveAssessment(AssessmentRequest request) {

        log.debug("Persistiendo nuevo Assessment para Facility MW: {}", request.facilityMw());

        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
        LocalDateTime expiration = now.plusHours(24); // TTL de 24 horas

        Assessment assessment = Assessment.builder()
                .sessionId(request.sessionId())
                .lead(leadRepository.getReferenceById(request.leadId()))
                .facilityMw(request.facilityMw())
                .utilization(request.utilization())
                .coolingType(request.coolingType())
                .status(AssessmentStatus.DRAFT)
                .createdAt(now)
                .lastAccessedAt(now)
                .expiresAt(expiration)
                .build();

        Assessment savedAssessment = assessmentRepository.save(assessment);

        log.info("Assessment guardado exitosamente en PostgreSQL. ID: {}, Session: {}",
                savedAssessment.getId(), savedAssessment.getSessionId());

        return new AssessmentInitializeResponse(
                savedAssessment.getId(),
                savedAssessment.getSessionId(),
                savedAssessment.getLead().getId(),
                savedAssessment.getStatus(),
                savedAssessment.getExpiresAt()
        );
    }
}