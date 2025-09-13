package com.chamaai.authservice.infrastructure.adapters.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.chamaai.authservice.application.ports.out.TokenProviderPort;
import com.chamaai.authservice.infrastructure.exceptions.InvalidTokenException;
import com.chamaai.common.enums.TokenPurpose;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.UUID;

@Component
public class JwtProvider implements TokenProviderPort {

    private static final String CLAIM_PURPOSE = "purpose";

    private final String issuer;
    private final Algorithm algorithm;

    public JwtProvider(
            @Value("${api.security.token.secret}") String secret,
            @Value("${spring.application.issuer}") String issuer
    ) {
        this.issuer = issuer;
        this.algorithm = Algorithm.HMAC256(secret);
    }

    @Override
    public String generateToken(String userId, TokenPurpose tokenPurpose) {
        Instant now = Instant.now();
        Instant expiration = now.plusSeconds(genExpiration(tokenPurpose));
        try {
            return JWT.create()
                    .withJWTId(UUID.randomUUID().toString())
                    .withIssuer(issuer)
                    .withSubject(userId)
                    .withClaim(CLAIM_PURPOSE, tokenPurpose.getValue())
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(expiration)
                    .sign(this.algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException(exception.getMessage());
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

    private int genExpiration(TokenPurpose tokenPurpose) {
        return switch (tokenPurpose) {
            case TokenPurpose.ACCOUNT_CREATION -> 600;
            case TokenPurpose.SESSION -> 7200;
            case TokenPurpose.PASSWORD_RESET, TokenPurpose.OTP_VERIFICATION -> 900;
            default -> throw new InvalidTokenException("Invalid token purpose");
        };
    }

    private String extractAllClaims(String token) {
        return JWT.decode(token).getClaims().toString();
    }
}
