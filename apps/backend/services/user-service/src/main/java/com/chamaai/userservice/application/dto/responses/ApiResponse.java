package com.chamaai.userservice.application.dto.responses;

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
