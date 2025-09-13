package com.chamaai.userservice.infrastructure.adapters.http.dto.responses;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"field", "rejectedValue", "message"})
public record ErrorDetailsDTO(
        String field,
        Object rejectedValue,
        String message
) {
}
