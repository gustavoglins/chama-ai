package com.chamaai.userservice.service;

import com.chamaai.userservice.entity.User;

public interface TokenService {

    String generateToken(User user);

    String validateToken(String token);

    String generateResetPasswordToken(User user);
}
