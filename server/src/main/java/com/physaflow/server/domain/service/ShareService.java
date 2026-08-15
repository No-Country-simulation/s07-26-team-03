package com.physaflow.server.domain.service;

import com.physaflow.server.application.dto.share.PublicShareResponse;
import com.physaflow.server.application.dto.share.ShareCreateRequest;
import com.physaflow.server.application.dto.share.ShareResponse;
import com.physaflow.server.application.exception.http.BadRequestException;
import com.physaflow.server.application.exception.http.ConflictException;
import com.physaflow.server.application.exception.http.ForbiddenException;
import com.physaflow.server.application.exception.http.NotFoundException;
import com.physaflow.server.application.mapper.ShareMapper;
import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.AssessmentResult;
import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.domain.model.Share;
import com.physaflow.server.infrastructure.repository.AssessmentResultRepository;
import com.physaflow.server.infrastructure.repository.ShareRepository;
import com.physaflow.server.infrastructure.security.SecurityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShareService {

    private final ShareRepository shareRepository;
    private final AssessmentService assessmentService;
    private final AssessmentResultRepository assessmentResultRepository;
    private final SecurityService securityService;
    private final ShareMapper shareMapper;

    @Value("${frontend.redirect.url}")
    private String frontendUrl;

    @Value("${share.default-expiration-days:7}")
    private int defaultExpirationDays;

    private static final int TOKEN_BYTES = 32;
    private static final int MAX_GENERATION_ATTEMPTS = 3;

    @Transactional
    public ShareResponse createShare(UUID assessmentId, ShareCreateRequest request) {
        log.info("Creating share for assessment ID: {}", assessmentId);

        Assessment assessment = assessmentService.findByIdForCurrentUser(assessmentId);

        if (!assessmentResultRepository.existsByAssessmentId(assessmentId)) {
            throw new BadRequestException("Assessment does not have a calculated result.");
        }

        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
        LocalDateTime expiresAt = resolveExpiration(request, now);

        Share savedShare = persistShareWithUniqueToken(assessment, now, expiresAt);

        log.info("Share created successfully. ID: {}, Token: {}", savedShare.getId(), savedShare.getPublicToken());

        return shareMapper.toResponse(savedShare, frontendUrl);
    }

    @Transactional
    public PublicShareResponse getPublicShareByToken(String token) {
        log.info("Retrieving public share with token: {}", token);

        Share share = shareRepository.findByPublicToken(token)
                .orElseThrow(() -> new NotFoundException("Link not found or expired."));

        if (isExpired(share)) {
            throw new NotFoundException("Link not found or expired.");
        }

        int updatedRows = shareRepository.incrementViews(share.getId());
        if (updatedRows == 0) {
            throw new NotFoundException("Link not found or expired.");
        }

        AssessmentResult result = assessmentResultRepository
                .findByAssessmentId(share.getAssessment().getId())
                .orElseThrow(() -> new NotFoundException("Link not found or expired."));

        return shareMapper.toPublicResponse(result);
    }

    @Transactional
    public void revokeShare(UUID shareId) {
        log.info("Revoking share ID: {}", shareId);

        Lead currentLead = securityService.getAuthenticatedLead();

        Share share = shareRepository.findById(shareId)
                .orElseThrow(() -> new NotFoundException("Share not found."));

        Assessment assessment = share.getAssessment();
        if (assessment.getLead() == null || !assessment.getLead().getId().equals(currentLead.getId())) {
            throw new ForbiddenException("You do not have permission to revoke this link.");
        }

        shareRepository.delete(share);

        log.info("Share ID: {} revoked successfully by lead ID: {}", shareId, currentLead.getId());
    }

    private Share persistShareWithUniqueToken(Assessment assessment, LocalDateTime now, LocalDateTime expiresAt) {
        for (int attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
            String publicToken = generateSecureToken();

            Share share = Share.builder()
                    .assessment(assessment)
                    .publicToken(publicToken)
                    .views(0)
                    .createdAt(now)
                    .expiresAt(expiresAt)
                    .build();

            try {
                return shareRepository.saveAndFlush(share);
            } catch (DataIntegrityViolationException ex) {
                log.warn("Token collision detected on persist. Attempt: {}", attempt + 1);
            }
        }

        throw new ConflictException("Could not generate a unique share token.");
    }

    private LocalDateTime resolveExpiration(ShareCreateRequest request, LocalDateTime now) {
        if (request.expiresAt() != null) {
            return request.expiresAt();
        }
        return now.plusDays(defaultExpirationDays);
    }

    private boolean isExpired(Share share) {
        return share.getExpiresAt() != null
                && share.getExpiresAt().isBefore(LocalDateTime.now(ZoneOffset.UTC));
    }

    private String generateSecureToken() {
        byte[] bytes = new byte[TOKEN_BYTES];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
