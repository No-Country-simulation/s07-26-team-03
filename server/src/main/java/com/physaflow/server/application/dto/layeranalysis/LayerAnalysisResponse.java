package com.physaflow.server.application.dto.layeranalysis;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record LayerAnalysisResponse(
        UUID assessmentId,
        List<LayerResponse> layers,
        BigDecimal strandedMw,
        BigDecimal strandedPercent
) {
}
