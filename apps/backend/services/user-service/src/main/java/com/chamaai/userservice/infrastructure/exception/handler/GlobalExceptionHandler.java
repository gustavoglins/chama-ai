package com.chamaai.userservice.infrastructure.exception.handler;

import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.ApiResponse;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.ApiResponseStatus;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.ErrorDetailsDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception exception) {
        ApiResponse<Object> response = new ApiResponse<>(
                ApiResponseStatus.ERROR,
                500,
                exception.getMessage(),
                null,
                List.of(new ErrorDetailsDTO(null, null, exception.getMessage()))
        );
        return ResponseEntity.status(500).body(response);
    }
}
