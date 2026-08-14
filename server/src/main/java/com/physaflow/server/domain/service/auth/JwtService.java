package com.physaflow.server.domain.service.auth;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.physaflow.server.domain.model.Lead;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;


@Service
public class JwtService {


    private final Algorithm algorithm;
    private final JWTVerifier verifier;
    private final String issuer;
    @Getter
    private final long expirationSeconds;

    public JwtService(
            @Value("${api.security.secret}") String apiSecret,
            @Value("${api.security.issuer:physaflow}") String issuer,
            @Value("${api.security.expiration-seconds:3600}") long expirationSeconds
    ) {
        this.algorithm = Algorithm.HMAC256(apiSecret);
        this.issuer = issuer;
        this.expirationSeconds = expirationSeconds;

        this.verifier = JWT.require(algorithm)
                .withIssuer(issuer)
                .build();
    }


    public String generateToken(Lead lead){
        try {

            Instant now = Instant.now();

            Instant expiration = now.plusSeconds(
                    expirationSeconds
            );

            return JWT.create()
                    .withIssuer(issuer)
                    .withSubject(lead.getEmail())
                    .withClaim("uuid", lead.getId().toString())
                    .withIssuedAt(Date.from(now))
                    .withExpiresAt(Date.from(expiration))
                    .sign(algorithm);

        } catch (JWTCreationException exception) {

            throw new IllegalStateException(
                    "Could not create authentication token.",
                    exception
            );
        }

    }

    public String getSubject(String token) {
        if (token == null) {
            throw new JWTVerificationException(
                    "Token is missing."
            );
        }

        try {
            DecodedJWT decodedJWT =
                    verifier.verify(token);

            return decodedJWT.getSubject();
        } catch (JWTVerificationException exception) {
            System.out.println(exception.toString());
            throw exception; // Propaga la excepción para manejo adecuado en el controlador.
        }

    }

}
