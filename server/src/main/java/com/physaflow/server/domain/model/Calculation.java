package com.physaflow.server.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "calculations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calculation {

    @Id
    @Column(name = "id", length = 12, updatable = false, nullable = false)
    private String id;

    @Column(name = "facility_mw", precision = 10, scale = 2, nullable = false)
    private BigDecimal facilityMw;

    @Column(name = "utilization_pct", precision = 5, scale = 2, nullable = false)
    private BigDecimal utilizationPct;

    @Column(name = "cooling_type", length = 32, nullable = false)
    private String coolingType;

    @Column(name = "stranded_pct", precision = 5, scale = 2, nullable = false)
    private BigDecimal strandedPct;

    @Column(name = "stranded_mw", precision = 10, scale = 2, nullable = false)
    private BigDecimal strandedMw;

    @Column(name = "waste_usd_low", precision = 15, scale = 2, nullable = false)
    private BigDecimal wasteUsdLow;

    @Column(name = "waste_usd_high", precision = 15, scale = 2, nullable = false)
    private BigDecimal wasteUsdHigh;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "layers_payload", columnDefinition = "jsonb")
    private String layersPayload;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_scenario_id")
    private Calculation parentScenario;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    /**
     * Callback JPA que garantiza la asignación automática del ID alfanumérico corto
     * antes de cualquier operación de persistencia, previniendo el IdentifierGenerationException.
     */
    @PrePersist
    public void prePersist() {
        if (this.id == null || this.id.isBlank()) {
            this.id = java.util.UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        }
        if (this.coolingType != null) {
            this.coolingType = this.coolingType.toLowerCase().trim();
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Calculation that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public void setCoolingType(String coolingType) {
        this.coolingType = coolingType != null ? coolingType.toLowerCase().trim() : null;
    }
}