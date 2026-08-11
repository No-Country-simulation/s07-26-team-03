package com.physaflow.server.domain.model;

import com.physaflow.server.domain.model.enums.AssessmentStatus;
import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.UtilizationLevel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "assessment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assessment {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id")
    private Lead lead;

    @Column(name = "session_id")
    private UUID sessionId;

    @Column(name = "facility_mw", precision = 10, scale = 2)
    private BigDecimal facilityMw;

    @Column(name = "utilization", precision = 5, scale = 2, nullable = false)
    private BigDecimal utilization;

    @Enumerated(EnumType.STRING)
    @Column(name = "cooling_type", length = 50)
    private CoolingType coolingType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50, nullable = false)
    private AssessmentStatus status;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "last_accessed_at")
    private LocalDateTime lastAccessedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<AssessmentResult> results = new ArrayList<>();

    @OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<LayerAnalysis> layerAnalyses = new ArrayList<>();

    @OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Scenario> scenarios = new ArrayList<>();

    @OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "assessment", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Share> shares = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Assessment that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}