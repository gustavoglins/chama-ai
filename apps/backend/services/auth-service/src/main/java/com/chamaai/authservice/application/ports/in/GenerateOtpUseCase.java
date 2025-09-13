package com.chamaai.authservice.application.ports.in;

import com.chamaai.authservice.application.dto.requests.GenerateOtpRequestDTO;

public interface GenerateOtpUseCase {
    void generateOTP(GenerateOtpRequestDTO generateOtpRequestDTO);
}
