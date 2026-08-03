package com.physaflow.server.infrastructure.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Deshabilitar CSRF ya que nuestra API REST es stateless y consumida por clientes desacoplados
                .csrf(csrf -> csrf.disable())
                // Configurar política de sesiones como sin estado (Stateless), ideal para Virtual Threads
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Autorización de rutas públicas (Assessment, Leads, Dashboard y documentación OpenAPI)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/error"
                        ).permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}