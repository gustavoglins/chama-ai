package com.chamaai.userservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "User is not of legal age.")
public class UserNotOfLegalAgeException extends RuntimeException {
    public UserNotOfLegalAgeException() {
        super("User is not of legal age");
    }
}
