package com.physaflow.server.application.mapper;


import com.physaflow.server.application.dto.calculation.EstimateRequest;
import com.physaflow.server.application.dto.calculation.EstimateResponse;
import com.physaflow.server.domain.command.AssessmentCommand;
import com.physaflow.server.domain.model.Calculation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface CalculatorMapper {

    /**
     * Mapea el DTO de entrada HTTP validado hacia el Command inmutable del dominio (CQRS-lite).
     *
     * @param request EstimateRequest con los parámetros físicos y de refrigeración.
     * @return AssessmentCommand listo para ser consumido por el CalculatorService.
     */
    @Mapping(target = "totalCapacityMw", source = "totalCapacityMw")
    @Mapping(target = "utilizationPct", source = "utilizationPct")
    @Mapping(target = "coolingType", source = "coolingType")
    AssessmentCommand toCommand(EstimateRequest request);

    /**
     * Transforma la Entidad JPA de dominio hacia el DTO de respuesta HTTP,
     * exponiendo el identificador corto (share token) y las métricas analíticas calculadas.
     *
     * @param calculation Entidad persistida en PostgreSQL.
     * @return EstimateResponse optimizado para la respuesta del cliente.
     */
    @Mapping(target = "id", source = "id")
    @Mapping(target = "strandedMw", source = "strandedMw")
    @Mapping(target = "strandedPct", source = "strandedPct")
    @Mapping(target = "wasteUsdLow", source = "wasteUsdLow")
    @Mapping(target = "wasteUsdHigh", source = "wasteUsdHigh")
    @Mapping(target = "createdAt", source = "createdAt")
    EstimateResponse toResponse(Calculation calculation);
}