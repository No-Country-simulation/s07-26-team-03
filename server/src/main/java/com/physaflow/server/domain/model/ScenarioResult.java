package com.physaflow.server.domain.model;

import com.physaflow.server.domain.model.enums.CapacityScore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "scenario_result")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScenarioResult {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "scenario_id", nullable = false, unique = true)
    private Scenario scenario;

    @Column(name = "stranded_percent", precision = 6, scale = 2)
    private BigDecimal strandedPercent;

    @Column(name = "stranded_mw", precision = 10, scale = 2)
    private BigDecimal strandedMw;

    @Column(name = "annual_cost", precision = 15, scale = 2)
    private BigDecimal annualCost;

    @Enumerated(EnumType.STRING)
    @Column(name = "capacity_score", length = 50)
    private CapacityScore capacityScore;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ScenarioResult that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
