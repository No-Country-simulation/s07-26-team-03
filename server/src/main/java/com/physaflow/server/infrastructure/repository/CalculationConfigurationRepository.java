package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.CalculationConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CalculationConfigurationRepository extends JpaRepository<CalculationConfiguration, UUID> {

    /**
     * Recupera la configuración matemática activa del sistema mediante JPQL explícito.
     * Evita errores de análisis por convenciones de nombres en Spring Data JPA.
     *
     * @return Optional con la configuración activa.
     */
    @Query("SELECT c FROM CalculationConfiguration c WHERE c.active = true")
    Optional<CalculationConfiguration> findActiveConfiguration();
}