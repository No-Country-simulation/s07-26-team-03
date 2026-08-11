package com.physaflow.server.application.dto.auth;

public record AuthenticationResponse(
        String accessToken,
        String tokenType,
        long expiresIn
) {}
