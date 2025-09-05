package com.chamaai.userservice.dto.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record SendOtpNotificationRequestDto(
        @NotBlank(message = "Recipient is required")
        String recipient,

        @Min(value = 100000, message = "OTP code must be 6 digits")
        @Max(value = 999999, message = "OTP code must be 6 digits")
        int otpCode
) {
}
