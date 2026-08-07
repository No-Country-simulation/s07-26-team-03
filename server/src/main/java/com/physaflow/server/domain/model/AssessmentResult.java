package com.physaflow.server.domain.model;

import com.physaflow.server.domain.model.enums.CapacityScore;
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
@Table(name = "assessment_result")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentResult {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "configuration_id", nullable = false)
    private CalculationConfiguration configuration;

    @Column(name = "stranded_percent", precision = 6, scale = 2)
    private BigDecimal strandedPercent;

    @Column(name = "stranded_mw", precision = 10, scale = 2)
    private BigDecimal strandedMw;

    @Column(name = "annual_cost_min", precision = 15, scale = 2)
    private BigDecimal annualCostMin;

    @Column(name = "annual_cost_max", precision = 15, scale = 2)
    private BigDecimal annualCostMax;

    @Enumerated(EnumType.STRING)
    @Column(name = "capacity_score", length = 50)
    private CapacityScore capacityScore;

    @Column(name = "recommendation_summary", columnDefinition = "TEXT")
    private String recommendationSummary;

    @Column(name = "algorithm_version", length = 50)
    private String algorithmVersion;

    @Column(name = "calculated_at", nullable = false, updatable = false)
    private LocalDateTime calculatedAt;

    @OneToMany(mappedBy = "assessmentResult", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Recommendation> recommendations = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AssessmentResult that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
