package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.Calculation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CalculationRepository extends JpaRepository<Calculation, String> {

    /**
     * Recupera un cálculo a partir de su ID alfanumérico corto (12 caracteres)
     * para renderizar el Assessment Form o alimentar el Interactive Dashboard.
     *
     * @param id Identificador corto expuesto en la URL compartible.
     * @return Optional conteniendo la entidad Calculation si existe.
     */
    Optional<Calculation> findById(String id);
}