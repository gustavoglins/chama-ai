package com.chamaai.common.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record ValidateOtpRequestDTO(

        @NotBlank(message = "Login is required")
        String login,

        @NotBlank(message = "OTP is required")
        String otp
) {
}
