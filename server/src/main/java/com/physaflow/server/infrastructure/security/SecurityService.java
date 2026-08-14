package com.physaflow.server.infrastructure.security;


import com.physaflow.server.application.exception.http.UnauthorizedException;
import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.infrastructure.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityService {

    private final LeadRepository leadRepository;

    public Lead getAuthenticatedLead() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new UnauthorizedException(
                    "Authentication is required."
            );
        }

        String email = authentication.getName();

        return leadRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new UnauthorizedException(
                                "Authenticated user not found."
                        )
                );
    }
}