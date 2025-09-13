package com.chamaai.userservice.application.ports.out;

import com.chamaai.common.dto.responses.ApiResponseDTO;

public interface AuthRestPort {
    <T> ApiResponseDTO<T> generateOtp(String login);

    <T> ApiResponseDTO<T> validateOtp(String login, String otp);
}
