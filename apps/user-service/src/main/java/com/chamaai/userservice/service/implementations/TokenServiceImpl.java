package com.chamaai.userservice.service.implementations;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.chamaai.userservice.entity.User;
import com.chamaai.userservice.service.interfaces.TokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
public class TokenServiceImpl implements TokenService {

    private final String issuer;
    private final int expirationTime;
    private final Algorithm algorithm;

    public TokenServiceImpl(
            @Value("${api.security.token.secret}") String secret,
            @Value("${spring.application.issuer}") String issuer,
            @Value("${api.security.token.expire-length}") int expirationTime
    ) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.issuer = issuer;
        this.expirationTime = expirationTime;
    }

    @Override
    public String generateToken(User user) {
        try {
            return JWT.create()
                    .withJWTId(UUID.randomUUID().toString())
                    .withIssuer(issuer)
                    .withSubject(user.getUsername())
                    .withClaim("purpose", "USER_SESSION")
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(Instant.now().plusSeconds(expirationTime))
                    .sign(this.algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error whiling generating token: " + exception.getMessage());
        }
    }

    @Override
    public String generateResetPasswordToken(User user) {
        try {
            return JWT.create()
                    .withJWTId(UUID.randomUUID().toString())
                    .withIssuer(issuer)
                    .withSubject(user.getUsername())
                    .withClaim("purpose", "PASSWORD_RESET")
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(Date.from(Instant.now().plus(15, ChronoUnit.MINUTES)))
                    .sign(this.algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error whiling generating token: " + exception.getMessage());
        }
    }

    @Override
    public String generateSignupVerificationToken(String key) {
        try {
            return JWT.create()
                    .withJWTId(UUID.randomUUID().toString())
                    .withIssuer(issuer)
                    .withSubject(key)
                    .withClaim("purpose", "SIGNUP_VERIFICATION")
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(Date.from(Instant.now().plus(15, ChronoUnit.MINUTES)))
                    .sign(this.algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error whiling generating token: " + exception.getMessage());
        }
    }

    @Override
    public String validateToken(String token) {
        try {
            return JWT.require(this.algorithm)
                    .withIssuer(issuer)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    @Override
    public String getSubjectFromToken(String token) {
        return JWT.decode(token).getSubject();
    }
}
