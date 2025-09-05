package com.chamaai.userservice.dto.responses;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"status", "message", "expiresIn"})
public record SendCodeResponseDTO(
        String status,
        String message,
        int expiresIn
) {
}
