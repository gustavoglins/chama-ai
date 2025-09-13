package com.chamaai.common.dto.responses;

import com.chamaai.common.enums.ApiResponseStatus;

import java.util.List;

public record ApiResponseDTO<T>(
        ApiResponseStatus status,
        int code,
        String message,
        T data,
        List<ErrorDetailsDTO> errors
) {
}