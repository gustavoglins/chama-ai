package com.chamaai.userservice.dto.requests;

import com.chamaai.userservice.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ClientSignupRequestDto(
        @NotBlank(message = "Token is required.")
        String token,

        @NotBlank(message = "First name is required.")
        String firstName,

        @NotBlank(message = "Last name is required.")
        String lastName,

        @NotBlank(message = "Password is required.")
        String password,

        @NotNull(message = "Date of birth is required.")
        LocalDate dateOfBirth,

        @NotNull(message = "Gender is required.")
        Gender gender
) {
}
