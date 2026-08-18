package com.physaflow.server.application.mapper;

import com.physaflow.server.application.dto.share.PublicShareResponse;
import com.physaflow.server.application.dto.share.ShareResponse;
import com.physaflow.server.domain.model.AssessmentResult;
import com.physaflow.server.domain.model.Share;
import org.springframework.stereotype.Component;

@Component
public class ShareMapper {

    public ShareResponse toResponse(Share share, String frontendUrl) {
        return new ShareResponse(
                share.getId(),
                share.getAssessment().getId(),
                share.getPublicToken(),
                buildShareUrl(share.getPublicToken(), frontendUrl),
                share.getViews(),
                share.getExpiresAt(),
                share.getCreatedAt()
        );
    }

    public PublicShareResponse toPublicResponse(AssessmentResult result) {
        return new PublicShareResponse(
                result.getAssessment().getId(),
                result.getAssessment().getFacilityMw(),
                result.getAssessment().getUtilization(),
                result.getAssessment().getCoolingType(),
                result.getStrandedPercent(),
                result.getStrandedMw(),
                result.getAnnualCostMin(),
                result.getAnnualCostMax(),
                result.getCapacityScore().name(),
                result.getRecommendationSummary(),
                result.getAlgorithmVersion(),
                result.getCalculatedAt()
        );
    }

    private String buildShareUrl(String publicToken, String frontendUrl) {
        String base = frontendUrl.endsWith("/") ? frontendUrl.substring(0, frontendUrl.length() - 1) : frontendUrl;
        return base + "/share/" + publicToken;
    }
}
