package com.chamaai.userservice.application.ports.out;

import com.chamaai.common.enums.TokenPurpose;

public interface TokenProviderPort {
    String generateToken(String userId);

    String getUserIdFromToken(String token);

    String getPurposeFromToken(String token);

    boolean validateToken(String token, TokenPurpose expectedTokenPurpose);
}
