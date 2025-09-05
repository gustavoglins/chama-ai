package com.chamaai.userservice.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record VerifyOtpRequestDTO(
        @NotBlank(message = "Key is required")
        String key,

        @NotBlank(message = "Authentication code is required")
        String code
) {
}
