package com.physaflow.server.infrastructure.repository;

import com.physaflow.server.domain.model.Share;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ShareRepository extends JpaRepository<Share, UUID> {

    Optional<Share> findByPublicToken(String publicToken);

    boolean existsByPublicToken(String publicToken);

    @Modifying
    @Query("UPDATE Share s SET s.views = s.views + 1 WHERE s.id = :id")
    int incrementViews(@Param("id") UUID id);
}
