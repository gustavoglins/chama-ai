package com.chamaai.userservice.exceptions.handler;

import com.chamaai.userservice.dto.responses.ApiErrorResponse;
import com.chamaai.userservice.exceptions.InvalidOtpException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneric(Exception exception) {
        ApiErrorResponse error = new ApiErrorResponse(
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ApiErrorResponse> handleInvalidOtp(InvalidOtpException ex) {
        ApiErrorResponse error = new ApiErrorResponse(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST.value(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
