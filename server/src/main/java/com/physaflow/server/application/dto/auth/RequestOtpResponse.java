package com.physaflow.server.application.dto.auth;

public record RequestOtpResponse(
        String message,
        long expiresInSeconds
) {}
