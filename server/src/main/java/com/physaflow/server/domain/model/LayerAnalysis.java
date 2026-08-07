package com.physaflow.server.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "layer_analysis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LayerAnalysis {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessment assessment;

    @Column(name = "layer", length = 100, nullable = false)
    private String layer;

    @Column(name = "input_mw", precision = 10, scale = 2)
    private BigDecimal inputMw;

    @Column(name = "output_mw", precision = 10, scale = 2)
    private BigDecimal outputMw;

    @Column(name = "loss_mw", precision = 10, scale = 2)
    private BigDecimal lossMw;

    @Column(name = "loss_percent", precision = 6, scale = 2)
    private BigDecimal lossPercent;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    @OneToMany(mappedBy = "layerAnalysis", fetch = FetchType.LAZY)
    @Builder.Default
    private List<LossFactor> lossFactors = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LayerAnalysis that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
