package com.chamaai.userservice.infrastructure.adapters.http.dto.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record StartRegistrationRequestDTO(

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email address")
        String email
) {
}
