package com.chamaai.userservice.infrastructure.adapters.http.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record StartRegistrationRequestDTO(

        @NotBlank(message = "Login is required")
        String login
) {
}
