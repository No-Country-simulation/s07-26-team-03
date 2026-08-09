package com.physaflow.server.application.dto.assessment;

import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.domain.model.enums.AssessmentStatus;
import java.time.LocalDateTime;
import java.util.UUID;

public record AssessmentInitializeResponse(
        UUID id,
        UUID sessionId,
        UUID leadId,
        AssessmentStatus status,
        LocalDateTime expiresAt
) {}