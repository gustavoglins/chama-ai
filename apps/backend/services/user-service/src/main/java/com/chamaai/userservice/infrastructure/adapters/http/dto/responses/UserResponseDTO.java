package com.chamaai.userservice.infrastructure.adapters.http.dto.responses;

import com.chamaai.userservice.domain.enums.AccountType;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@JsonPropertyOrder({"id", "firstName", "lastName", "email", "accountType", "createdAt", "profilePicture", "bio"})
public record UserResponseDTO(
        UUID id,
        String firstName,
        String lastName,
        String email,
        Set<AccountType> accountType,
        LocalDateTime createdAt,
        String profilePicture,
        String bio
) {
}
