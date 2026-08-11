package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.domain.model.OtpCode;
import com.physaflow.server.domain.model.enums.OtpPurpose;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OtpCodeRepository
        extends JpaRepository<OtpCode, UUID> {

    Optional<OtpCode>
    findTopByLeadAndPurposeAndUsedAtIsNullOrderByCreatedAtDesc(
            Lead lead,
            OtpPurpose purpose
    );
}