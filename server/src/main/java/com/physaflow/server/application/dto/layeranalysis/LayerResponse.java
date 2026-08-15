package com.physaflow.server.application.dto.layeranalysis;

import com.physaflow.server.domain.model.enums.LayerType;

import java.math.BigDecimal;
import java.util.List;

public record LayerResponse(
        LayerType layer,
        BigDecimal inputMw,
        BigDecimal outputMw,
        BigDecimal lossMw,
        BigDecimal lossPercent,
        Integer displayOrder,
        List<LossFactorResponse> lossFactors
) {

}