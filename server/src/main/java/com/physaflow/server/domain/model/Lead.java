package com.physaflow.server.domain.model;

import com.physaflow.server.domain.model.enums.LeadStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "lead")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "email", length = 255, nullable = false, unique = true)
    private String email;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "company", length = 255)
    private String company;

    @Column(name = "role", length = 255)
    private String role;

    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50, nullable = false)
    private LeadStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "lead", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Assessment> assessments = new ArrayList<>();

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
