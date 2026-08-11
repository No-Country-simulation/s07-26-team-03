package com.physaflow.server.infrastructure.repository;


import com.physaflow.server.domain.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface    LeadRepository extends JpaRepository<Lead, UUID> {
    // Al extender JpaRepository ya tienes métodos como findById(), getReferenceById(), save(), etc.
}