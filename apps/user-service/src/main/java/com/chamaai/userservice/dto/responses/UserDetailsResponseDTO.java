package com.chamaai.userservice.dto.responses;

import com.chamaai.userservice.enums.AccountType;
import com.chamaai.userservice.enums.Gender;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Set;

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
