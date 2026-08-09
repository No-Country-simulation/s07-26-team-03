package com.physaflow.server.application.mapper;

import com.physaflow.server.application.dto.assessment.AssessmentInitializeResponse;
import com.physaflow.server.application.dto.assessment.AssessmentRequest;
import com.physaflow.server.domain.model.Assessment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AssessmentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "lead", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "expiresAt", ignore = true)
    @Mapping(target = "lastAccessedAt", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "results", ignore = true)
    @Mapping(target = "layerAnalyses", ignore = true)
    @Mapping(target = "scenarios", ignore = true)
    @Mapping(target = "reports", ignore = true)
    @Mapping(target = "shares", ignore = true)
    Assessment toEntity(AssessmentRequest request);

    AssessmentInitializeResponse toResponse(Assessment entity);
}