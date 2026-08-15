package com.physaflow.server.application.controller;

import com.physaflow.server.application.dto.share.PublicShareResponse;
import com.physaflow.server.application.dto.share.ShareCreateRequest;
import com.physaflow.server.application.dto.share.ShareResponse;
import com.physaflow.server.domain.service.ShareService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Validated
@Tag(name = "Share", description = "Endpoints for sharing assessment results")
public class ShareController {

    private final ShareService shareService;

    @PostMapping("/assessments/{assessmentId}/shares")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create share link", description = "Generates a public link to share an assessment result. Requires authentication.")
    public ResponseEntity<ShareResponse> createShare(
            @PathVariable UUID assessmentId,
            @Valid @RequestBody(required = false) ShareCreateRequest request) {

        log.info("Received POST request to create share for assessment ID: {}", assessmentId);

        ShareCreateRequest resolvedRequest = request != null ? request : new ShareCreateRequest(null);
        ShareResponse response = shareService.createShare(assessmentId, resolvedRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/v1/shares/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/public/shares/{token}")
    @Operation(summary = "Get public share", description = "Allows accessing an assessment result via its public token without authentication.")
    public ResponseEntity<PublicShareResponse> getPublicShare(
            @PathVariable String token) {

        log.info("Received GET request to retrieve public share with token: {}", token);

        PublicShareResponse response = shareService.getPublicShareByToken(token);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/shares/{id}")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Revoke share link", description = "Deletes a share link. Requires authentication and ownership of the assessment.")
    public ResponseEntity<Void> revokeShare(
            @PathVariable UUID id) {

        log.info("Received DELETE request to revoke share ID: {}", id);

        shareService.revokeShare(id);
        return ResponseEntity.noContent().build();
    }
}
