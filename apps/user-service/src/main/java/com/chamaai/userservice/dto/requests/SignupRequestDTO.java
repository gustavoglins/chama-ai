package com.chamaai.userservice.dto.requests;

import com.chamaai.userservice.enums.AccountType;
import com.chamaai.userservice.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;
import java.time.LocalDate;

public record SignupRequestDTO(
        @NotBlank(message = "First name is required.")
        String firstName,

        @NotBlank(message = "Last name is required.")
        String lastName,

        @NotBlank(message = "Email is required.")
        String email,

        @NotNull(message = "Phone number is required.")
        BigInteger phoneNumber,

        @NotBlank(message = "Password is required.")
        String password,

        @NotNull(message = "Date of birth is required.")
        LocalDate dateOfBirth,

        @NotNull(message = "Gender is required.")
        Gender gender,

        @NotNull(message = "Account type is required.")
        AccountType accountType
) {
}
