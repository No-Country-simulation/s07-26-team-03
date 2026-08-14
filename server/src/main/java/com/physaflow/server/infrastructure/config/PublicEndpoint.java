package com.physaflow.server.infrastructure.config;

import org.springframework.http.HttpMethod;

public record PublicEndpoint(
        String url,
        HttpMethod method
) {
}