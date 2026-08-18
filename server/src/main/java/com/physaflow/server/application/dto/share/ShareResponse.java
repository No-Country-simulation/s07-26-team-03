package com.physaflow.server.application.dto.share;

import java.time.LocalDateTime;
import java.util.UUID;

public record ShareResponse(
        UUID id,
        UUID assessmentId,
        String publicToken,
        String shareUrl,
        Integer views,
        LocalDateTime expiresAt,
        LocalDateTime createdAt
) {
}
