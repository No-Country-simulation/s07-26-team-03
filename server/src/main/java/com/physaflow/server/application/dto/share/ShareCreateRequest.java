package com.physaflow.server.application.dto.share;

import jakarta.validation.constraints.Future;

import java.time.LocalDateTime;

public record ShareCreateRequest(

        @Future(message = "Expiration date must be in the future.")
        LocalDateTime expiresAt
) {
}
