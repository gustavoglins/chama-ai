package com.chamaai.authservice.application.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record GenerateOtpRequestDTO(

        @NotBlank(message = "Login is required")
        String login
) {
}
