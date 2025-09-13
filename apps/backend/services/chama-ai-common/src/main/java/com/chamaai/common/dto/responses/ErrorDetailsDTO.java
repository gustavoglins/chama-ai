package com.chamaai.common.dto.responses;

public record ErrorDetailsDTO(
        String field,
        Object rejectedValue,
        String message
) {
}
