package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.AssessmentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AssessmentResultRepository extends JpaRepository<AssessmentResult, UUID> {

    /**
     * Recupera el resultado analítico asociado a un assessment específico.
     * Utilizado en la Etapa 1 para mostrar el desglose instantáneo al usuario.
     *
     * @param assessmentId UUID del assessment principal.
     * @return Optional con el AssessmentResult correspondiente.
     */
    Optional<AssessmentResult> findByAssessmentId(UUID assessmentId);
}