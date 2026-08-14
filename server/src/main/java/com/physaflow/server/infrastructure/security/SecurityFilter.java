package com.physaflow.server.infrastructure.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.domain.service.auth.JwtService;
import com.physaflow.server.infrastructure.repository.LeadRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final LeadRepository leadRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token =
                authHeader.substring(7);

        try {

            String email =
                    jwtService.getSubject(token);

            Lead lead = leadRepository
                    .findByEmailIgnoreCase(email)
                    .orElse(null);

            if (lead != null) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                lead,
                                null,
                                lead.getAuthorities()
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);
            }

        } catch (JWTVerificationException ex) {

            SecurityContextHolder
                    .clearContext();

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.setContentType(
                    "application/json"
            );

            response.getWriter().write(
                    """
                    {
                        "status": 401,
                        "error": "Unauthorized",
                        "message": "Invalid or expired token."
                    }
                    """
            );

            return;
        }

        filterChain.doFilter(request, response);
    }

}
