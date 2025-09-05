package com.chamaai.notificationservice.dtos.requests;

import jakarta.validation.constraints.NotBlank;

public record SendOtpPhoneRequestDto(
        @NotBlank(message = "Recipient is required")
        String recipient,

        @NotBlank(message = "OTP code is required")
        String otpCode
) {
}
