package com.chamaai.userservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Phone number is already in use.")
public class PhoneAlreadyInUseException extends RuntimeException {
    public PhoneAlreadyInUseException() {
        super("Phone number is already in use.");
    }
}
