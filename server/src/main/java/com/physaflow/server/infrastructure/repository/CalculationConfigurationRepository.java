package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.CalculationConfiguration;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CalculationConfigurationRepository extends JpaRepository<CalculationConfiguration, UUID> {

    @Cacheable(value = "activeCalculationConfig", unless = "#result == null")
    @Query("SELECT c FROM CalculationConfiguration c WHERE c.active = true ORDER BY c.createdAt DESC")
    Optional<CalculationConfiguration> findActiveConfiguration();


    Optional<CalculationConfiguration> findFirstByActiveTrueOrderByCreatedAtDesc();
}