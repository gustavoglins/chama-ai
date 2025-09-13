package com.chamaai.notificationservice.application.exceptions;

public class UnsupportedNotificationTypeException extends RuntimeException {
    public UnsupportedNotificationTypeException(String message) {
        super(message);
    }
}
