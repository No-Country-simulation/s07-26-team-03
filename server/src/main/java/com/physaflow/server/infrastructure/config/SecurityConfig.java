package com.physaflow.server.infrastructure.config;


import com.physaflow.server.infrastructure.security.SecurityFilter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${frontend.cors.url}")
    private String frontendCors;

    private final SecurityFilter securityFilter;

    public SecurityConfig(SecurityFilter securityFilter) {
        this.securityFilter = securityFilter;
    }

    public static final List<PublicEndpoint> PUBLIC_ENDPOINTS = List.of(
            new PublicEndpoint("/api/v1/assessments", HttpMethod.POST),
            new PublicEndpoint("/api/v1/assessments/{id}", HttpMethod.GET),
            new PublicEndpoint("/api/v1/public/shares/{token}", HttpMethod.GET),
            new PublicEndpoint("/api/v1/public/shares/{token}/report/pdf", HttpMethod.GET),
            new PublicEndpoint("/api/v1/auth/request-otp", HttpMethod.POST),
            new PublicEndpoint("/api/v1/auth/verify-otp", HttpMethod.POST),
            new PublicEndpoint("/swagger-ui/**", HttpMethod.GET),
            new PublicEndpoint("/swagger-ui.html", HttpMethod.GET),
            new PublicEndpoint("/v3/api-docs/**", HttpMethod.GET),
            new PublicEndpoint("/error", HttpMethod.GET)
    );

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Deshabilitar CSRF ya que nuestra API REST es stateless y consumida por clientes desacoplados
                .csrf(AbstractHttpConfigurer::disable)
                // Configurar política de sesiones como sin estado (Stateless), ideal para Virtual Threads
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> {
                    // Permitir acceso sin autenticación a los endpoints públicos
                    PUBLIC_ENDPOINTS.forEach(endpoint ->
                            auth.requestMatchers(endpoint.method(), endpoint.url()).permitAll()
                    );
                    // Requerir autenticación para cualquier otro endpoint
                    auth.anyRequest().authenticated();
                })
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Collections.singletonList(frontendCors));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}