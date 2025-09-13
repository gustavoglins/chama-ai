package com.chamaai.userservice.infrastructure.adapters.http.dto.responses;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.List;

@JsonPropertyOrder({"status", "code", "message", "data", "errors"})
public record ApiResponse<T>(
        ApiResponseStatus status,
        int code,
        String message,
        T data,
        List<ErrorDetailsDTO> errors
) {
}
