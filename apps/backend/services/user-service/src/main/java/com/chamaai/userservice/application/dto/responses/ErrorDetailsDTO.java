package com.chamaai.userservice.application.dto.responses;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"field", "rejectedValue", "message"})
public record ErrorDetailsDTO(
        String field,
        Object rejectedValue,
        String message
) {
}
