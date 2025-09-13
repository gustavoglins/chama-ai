package com.chamaai.userservice.infrastructure.adapters.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.chamaai.common.enums.TokenPurpose;
import com.chamaai.userservice.application.ports.out.TokenProviderPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.UUID;

@Component
public class JwtProvider implements TokenProviderPort {

    private static final String CLAIM_PURPOSE = "purpose";

    private final String issuer;
    private final int expirationInSeconds;
    private final Algorithm algorithm;

    public JwtProvider(
            @Value("${api.security.token.secret}") String secret,
            @Value("${spring.application.issuer}") String issuer,
            @Value("${api.security.token.expiration-in-seconds}") int expirationInSeconds
    ) {
        this.issuer = issuer;
        this.expirationInSeconds = expirationInSeconds;
        this.algorithm = Algorithm.HMAC256(secret);
    }

    @Override
    public String generateToken(String userId) {
        try {
            return JWT.create()
                    .withJWTId(UUID.randomUUID().toString())
                    .withIssuer(issuer)
                    .withSubject(userId)
                    .withClaim(CLAIM_PURPOSE, "SESSION")
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(Instant.now().plusSeconds(expirationInSeconds))
                    .sign(this.algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public String getUserIdFromToken(String token) {
        return JWT.require(algorithm).build().verify(token).getSubject();
    }

    @Override
    public String getPurposeFromToken(String token) {
        return JWT.require(algorithm).build().verify(token).getClaim(CLAIM_PURPOSE).asString();
    }

    @Override
    public boolean validateToken(String token, TokenPurpose expectedTokenPurpose) {
        try {
            var verifier = JWT.require(this.algorithm)
                    .withIssuer(issuer)
                    .build();

            var decodeJWT = verifier.verify(token);
            String purpose = decodeJWT.getClaim(CLAIM_PURPOSE).asString();
            return expectedTokenPurpose.getValue().equals(purpose);
        } catch (JWTVerificationException exception) {
            return false;
        }
    }

    private String extractAllClaims(String token) {
        return JWT.decode(token).getClaims().toString();
    }
}