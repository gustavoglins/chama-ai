package com.chamaai.common.dto;

public record ErrorDetailsDTO(
        String field,
        Object rejectedValue,
        String message
) {
}
