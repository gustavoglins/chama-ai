package com.chamaai.userservice.dto.events;

import java.math.BigInteger;
import java.time.LocalDate;

public record UserCreatedEventDTO(
        String firstName,
        String lastName,
        String email,
        BigInteger phoneNumber,
        LocalDate dateOfBirth
) {
}
