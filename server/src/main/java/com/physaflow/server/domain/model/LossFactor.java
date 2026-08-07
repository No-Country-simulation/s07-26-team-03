package com.physaflow.server.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "loss_factor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LossFactor {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "layer_analysis_id", nullable = false)
    private LayerAnalysis layerAnalysis;

    @Column(name = "factor", length = 100)
    private String factor;

    @Column(name = "impact_percent", precision = 6, scale = 2)
    private BigDecimal impactPercent;

    @Column(name = "impact_mw", precision = 10, scale = 2)
    private BigDecimal impactMw;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LossFactor that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
