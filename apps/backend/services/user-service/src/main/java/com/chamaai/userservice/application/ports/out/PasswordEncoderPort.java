package com.chamaai.userservice.application.ports.out;

public interface PasswordEncoderPort {
    String encode(String rawPassword);
}
