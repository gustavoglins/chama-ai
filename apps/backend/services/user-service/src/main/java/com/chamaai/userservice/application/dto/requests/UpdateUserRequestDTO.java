package com.chamaai.userservice.application.dto.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record UpdateUserRequestDTO(

        @NotNull(message = "Id is required")
        UUID id,

        @Pattern(regexp = "^[\\p{L} -]+$", message = "First name must contain only letters, spaces, or hyphens")
        String firstName,

        @Pattern(regexp = "^[\\p{L} -]+$", message = "Last name must contain only letters, spaces, or hyphens")
        String lastName,

        @Email(message = "Email must be a valid email address")
        String email,

        @Pattern(
                regexp = "\\d{6,15}",
                message = "Phone number must contain only digits and be between 6 and 15 characters long"
        )
        String phoneNumber,
        String profilePicture,
        String bio
) {
}
