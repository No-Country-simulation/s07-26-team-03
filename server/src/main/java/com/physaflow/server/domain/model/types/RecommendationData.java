package com.physaflow.server.domain.model.types;

import com.physaflow.server.domain.model.enums.RecommendationPriority;

public record RecommendationData(
        String category,
        RecommendationPriority priority,
        String title,
        String description
) {
}
