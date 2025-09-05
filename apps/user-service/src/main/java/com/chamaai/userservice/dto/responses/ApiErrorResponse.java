package com.chamaai.userservice.dto.responses;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message", "status", "timestamp"})
public record ApiErrorResponse(
        String message,
        int status,
        long timestamp
) {
}
