package com.chamaai.userservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "Invalid OTP")
public class InvalidOtpException extends RuntimeException {
    public InvalidOtpException() {
        super("Invalid OTP");
    }
}
