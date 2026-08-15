package com.physaflow.server.domain.service.calculation;

import com.physaflow.server.domain.model.enums.CapacityTier;
import com.physaflow.server.domain.model.enums.RecommendationPriority;
import com.physaflow.server.domain.model.types.RecommendationData;
import org.springframework.stereotype.Service;

@Service
public class RecommendationCalculationService {

    public RecommendationData calculate(
            CapacityTier tier
    ) {

        if (tier == null) {
            throw new IllegalArgumentException(
                    "Capacity tier cannot be null."
            );
        }

        return switch (tier) {

            case EXCELLENT ->
                    new RecommendationData(
                            "Capacity Optimization",
                            RecommendationPriority.LOW,
                            "Excellent Capacity Utilization",
                            "Tu facility opera cerca del punto óptimo de eficiencia. " +
                                    "Quedan oportunidades menores de ajuste — explora el análisis " +
                                    "completo para encontrar los últimos puntos de capacidad recuperable."
                    );

            case GOOD ->
                    new RecommendationData(
                            "Capacity Optimization",
                            RecommendationPriority.MEDIUM,
                            "Good Capacity Utilization",
                            "Tu facility rinde por encima del promedio, pero aún hay una " +
                                    "cantidad relevante de capacidad varada. Revisa las capas de " +
                                    "IT y workload para identificar oportunidades de right-sizing."
                    );

            case MODERATE ->
                    new RecommendationData(
                            "Capacity Optimization",
                            RecommendationPriority.MODERATE,
                            "Capacity Optimization Recommended",
                            "Hay espacio para una mejora significativa. Una porción importante " +
                                    "de tu capacidad instalada no está generando valor — revisa el " +
                                    "desglose por capas para ubicar dónde ocurren las mayores pérdidas."
                    );

            case DEFICIENT ->
                    new RecommendationData(
                            "Capacity Optimization",
                            RecommendationPriority.HIGH,
                            "Capacity Optimization Required",
                            "Tu facility está perdiendo una cantidad sustancial de capacidad " +
                                    "y presupuesto cada año. Recomendamos un análisis completo por " +
                                    "capas y un plan de right-sizing como prioridad."
                    );

            case CRITICAL ->
                    new RecommendationData(
                            "Capacity Optimization",
                            RecommendationPriority.CRITICAL,
                            "Critical Capacity Waste",
                            "La capacidad varada es críticamente alta. Se recomienda acción " +
                                    "inmediata — comienza por el desglose por capas para identificar " +
                                    "la mayor fuente de pérdida."
                    );
        };
    }

}
