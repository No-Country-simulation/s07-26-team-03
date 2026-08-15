package com.physaflow.server.domain.service.scenarios;

import com.physaflow.server.domain.model.Assessment;
import com.physaflow.server.domain.model.CalculationConfiguration;
import com.physaflow.server.domain.model.Scenario;
import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.ScenarioType;
import com.physaflow.server.domain.rule.CoolingOptimizationRule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ScenarioGenerator {

    private final CoolingOptimizationRule coolingOptimizationRule;

    public List<Scenario> generate(
            Assessment assessment,
            CalculationConfiguration configuration
    ) {

        BigDecimal optimizedUtilization =
                calculateOptimizedUtilization(
                        assessment.getUtilization(),
                        configuration
                );

        Scenario utilizationScenario =
                buildUtilizationScenario(
                        assessment,
                        optimizedUtilization
                );

        Scenario infrastructureScenario =
                buildInfrastructureScenario(
                        assessment,
                        optimizedUtilization
                );

        return List.of(
                utilizationScenario,
                infrastructureScenario
        );
    }

    private Scenario buildUtilizationScenario(
            Assessment assessment,
            BigDecimal optimizedUtilization
    ) {

        return Scenario.builder()
                .assessment(assessment)
                .name("Utilization Optimization")
                .type(ScenarioType.UTILIZATION_OPTIMIZATION)
                .sortOrder(2)
                .facilityMw(assessment.getFacilityMw())
                .utilization(optimizedUtilization)
                .coolingType(assessment.getCoolingType())
                .build();
    }

    private Scenario buildInfrastructureScenario(
            Assessment assessment,
            BigDecimal optimizedUtilization
    ) {

        CoolingType optimizedCooling =
                coolingOptimizationRule.nextBetterCooling(
                        assessment.getCoolingType()
                );

        return Scenario.builder()
                .assessment(assessment)
                .name("Infrastructure Optimization")
                .type(ScenarioType.INFRASTRUCTURE_OPTIMIZATION)
                .sortOrder(3)
                .facilityMw(assessment.getFacilityMw())
                .utilization(optimizedUtilization)
                .coolingType(optimizedCooling)
                .build();
    }

    private BigDecimal calculateOptimizedUtilization(
            BigDecimal currentUtilization,
            CalculationConfiguration configuration
    ) {

        BigDecimal optimized =
                currentUtilization.add(
                        configuration.getScenarioUtilizationIncrement()
                );

        return optimized.min(
                configuration.getScenarioMaxUtilization()
        ).setScale(2, RoundingMode.HALF_UP);
    }
}