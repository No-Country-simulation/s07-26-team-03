package com.physaflow.server.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
@Table(name = "leads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    // Acoplamiento referencial fuerte. Si se borra el cálculo, la BD hará CASCADE.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "calculation_id", nullable = false, updatable = false)
    private Calculation calculation;

    @Column(name = "email", length = 255, nullable = false)
    private String email;

    @Column(name = "unlock_token", length = 32, nullable = false, unique = true)
    private String unlockToken;

    // PostgreSQL INET puede mapearse limpiamente a String si no necesitamos operaciones de red en Java
    @Column(name = "ip_address", columnDefinition = "inet")
    private String ipAddress;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private OffsetDateTime createdAt;

    // Implementación de equals() y hashCode() para entidades con PK autogenerada
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Lead lead)) return false;
        return id != null && id.equals(lead.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}