package com.physaflow.server.domain.model;

import com.physaflow.server.domain.model.enums.CoolingType;
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

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "facility_mw", precision = 10, scale = 2)
    private BigDecimal facilityMw;

    @Enumerated(EnumType.STRING)
    @Column(name = "utilization", length = 50)
    private UtilizationLevel utilization;

    @Enumerated(EnumType.STRING)
    @Column(name = "cooling_type", length = 50)
    private CoolingType coolingType;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "scenario", fetch = FetchType.LAZY)
    private ScenarioResult result;

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
