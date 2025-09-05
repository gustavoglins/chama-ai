package com.chamaai.userservice.dto.responses;

import com.chamaai.userservice.enums.AccountType;
import com.chamaai.userservice.enums.Gender;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Set;

@JsonPropertyOrder({ "accountId", "firstName", "lastName", "email", "phoneNumber", "dateOfBirth", "isVerified", "accountType", "profilePicture", "gender", "bio"})
public record UserDetailsResponseDTO(

        String accountId,
        String fistName,
        String lastName,
        String email,
        BigInteger phone,
        LocalDate dateOfBirth,
        boolean isVerified,
        Set<AccountType> accountType,
        String profilePicture,
        Gender gender,
        String bio
) {
}
