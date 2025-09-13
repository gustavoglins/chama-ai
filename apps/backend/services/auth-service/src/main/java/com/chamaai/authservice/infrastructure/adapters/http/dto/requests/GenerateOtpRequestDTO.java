package com.chamaai.authservice.infrastructure.adapters.http.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record GenerateOtpRequestDTO(
        @NotBlank(message = "Login is required")
        String login
) {
}
