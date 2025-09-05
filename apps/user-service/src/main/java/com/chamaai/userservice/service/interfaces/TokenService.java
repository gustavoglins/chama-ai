package com.chamaai.userservice.service.interfaces;

import com.chamaai.userservice.entity.User;

public interface TokenService {

    String generateToken(User user);

    String generateResetPasswordToken(User user);

    String generateSignupVerificationToken(String key);

    String validateToken(String token);

    String getSubjectFromToken(String token);
}
