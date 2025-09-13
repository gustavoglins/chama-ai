package com.chamaai.authservice.application.ports.out;

import com.chamaai.common.enums.TokenPurpose;

public interface TokenProviderPort {
    String generateToken(String userId, TokenPurpose tokenPurpose);

    String getUserIdFromToken(String token);

    String getPurposeFromToken(String token);

    boolean validateToken(String token, TokenPurpose expectedTokenPurpose);
}
