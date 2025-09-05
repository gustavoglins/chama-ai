package com.chamaai.userservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Email is already in use.")
public class EmailAlreadyInUseException extends RuntimeException {
    public EmailAlreadyInUseException() {
        super("Email is already in use.");
    }
}
