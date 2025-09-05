package com.chamaai.notificationservice.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record SendOtpPhoneRequestDto(
        @NotNull(message = "Recipient is required")
        BigInteger recipient,

        @NotBlank(message = "OTP code is required")
        String otpCode
) {
}
