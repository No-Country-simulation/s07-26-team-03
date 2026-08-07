package com.physaflow.server.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "calculation_configuration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalculationConfiguration {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "version", length = 50, nullable = false)
    private String version;

    @Column(name = "energy_price_per_kwh", precision = 10, scale = 4, nullable = false)
    private BigDecimal energyPricePerKwh;

    @Column(name = "hours_per_year", precision = 10, scale = 2, nullable = false)
    private BigDecimal hoursPerYear;

    @Column(name = "default_pue", precision = 6, scale = 4, nullable = false)
    private BigDecimal defaultPue;

    @Column(name = "air_cooling_factor", precision = 6, scale = 4, nullable = false)
    private BigDecimal airCoolingFactor;

    @Column(name = "chilled_water_factor", precision = 6, scale = 4, nullable = false)
    private BigDecimal chilledWaterFactor;

    @Column(name = "liquid_cooling_factor", precision = 6, scale = 4, nullable = false)
    private BigDecimal liquidCoolingFactor;

    @Column(name = "inmersion_cooling_factor", precision = 6, scale = 4, nullable = false)
    private BigDecimal inmersionCoolingFactor;

    @Column(name = "facility_efficiency", precision = 6, scale = 4, nullable = false)
    private BigDecimal facilityEfficiency;

    @Column(name = "it_efficiency", precision = 6, scale = 4, nullable = false)
    private BigDecimal itEfficiency;

    @Column(name = "workload_efficiency", precision = 6, scale = 4, nullable = false)
    private BigDecimal workloadEfficiency;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CalculationConfiguration that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
