package com.physaflow.server.domain.model.types;

import com.physaflow.server.domain.model.enums.CapacityScore;
import com.physaflow.server.domain.model.enums.CapacityTier;

public record CapacityScoreResult(
        CapacityScore score,
        CapacityTier tier
) {
}
