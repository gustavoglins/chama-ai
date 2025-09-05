package com.chamaai.userservice.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record SendOtpNotificationRequestDto(
        @NotBlank(message = "Recipient is required")
        String recipient,

        @NotBlank(message = "OTP code is required")
        int otpCode
) {
}
