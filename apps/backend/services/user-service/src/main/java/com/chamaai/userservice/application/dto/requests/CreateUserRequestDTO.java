package com.chamaai.userservice.application.dto.requests;

import com.chamaai.userservice.domain.enums.AccountType;
import com.chamaai.userservice.domain.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateUserRequestDTO(

        @NotBlank(message = "Tax ID is required")
        @Pattern(regexp = "[A-Za-z0-9]+", message = "Tax ID must contain only letters and numbers")
        String taxId,

        @NotBlank(message = "Email is required")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password,

        @NotNull(message = "Account type is required")
        AccountType accountType,

        @NotBlank(message = "First name is required")
        @Pattern(regexp = "^[\\p{L} -]+$", message = "First name must contain only letters, spaces, or hyphens")
        String firstName,

        @NotBlank(message = "Last name is required")
        @Pattern(regexp = "^[\\p{L} -]+$", message = "Last name must contain only letters, spaces, or hyphens")
        String lastName,

        @NotNull(message = "Date of birth is required")
        LocalDate dateOfBirth,

        @NotNull(message = "Gender is required")
        Gender gender,

        @Pattern(
                regexp = "\\d{6,15}",
                message = "Phone number must contain only digits and be between 6 and 15 characters long"
        )
        String phoneNumber,
        String profilePicture,
        String bio
) {
}
