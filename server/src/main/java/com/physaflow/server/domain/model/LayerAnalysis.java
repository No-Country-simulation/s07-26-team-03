package com.physaflow.server.domain.model;

import com.physaflow.server.domain.model.enums.LayerType;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "layer", nullable = false)
    private LayerType layer;

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

    @OneToMany(mappedBy = "layerAnalysis", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
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

    public void addLossFactor(LossFactor lossFactor) {
        lossFactor.assignTo(this);
        this.lossFactors.add(lossFactor);
    }

    public List<LossFactor> getLossFactors() {
        return List.copyOf(lossFactors);
    }

}
