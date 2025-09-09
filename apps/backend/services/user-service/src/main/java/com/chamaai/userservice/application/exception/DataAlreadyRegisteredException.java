package com.chamaai.userservice.application.exception;

import java.util.List;

public class DataAlreadyRegisteredException extends RuntimeException {
    public DataAlreadyRegisteredException(List<String> messages) {
        super(messages.toString());
    }
}
