package com.physaflow.server.domain.rule;

import com.physaflow.server.domain.model.enums.CoolingType;
import org.springframework.stereotype.Component;

import java.util.Objects;


@Component
public class CoolingOptimizationRule {

    public CoolingType nextBetterCooling(CoolingType current) {

        Objects.requireNonNull(current, "Cooling type must not be null");

        return switch (current) {
            case AIR -> CoolingType.HYBRID;
            case HYBRID -> CoolingType.LIQUID;
            case LIQUID, IMMERSION -> CoolingType.IMMERSION;
        };
    }
}