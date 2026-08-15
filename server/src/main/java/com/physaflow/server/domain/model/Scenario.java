package com.physaflow.server.domain.model;

import com.physaflow.server.domain.model.enums.CoolingType;
import com.physaflow.server.domain.model.enums.ScenarioType;
import com.physaflow.server.domain.model.enums.UtilizationLevel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "scenario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Scenario {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 50, nullable = false)
    private ScenarioType type;

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "facility_mw", precision = 10, scale = 2)
    private BigDecimal facilityMw;

    @Column(name = "utilization", precision = 5, scale = 2, nullable = false)
    private BigDecimal utilization;

    @Enumerated(EnumType.STRING)
    @Column(name = "cooling_type", length = 50)
    private CoolingType coolingType;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "scenario", fetch = FetchType.LAZY)
    private ScenarioResult result;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Scenario that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
