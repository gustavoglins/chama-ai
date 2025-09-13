package com.chamaai.notificationservice.application.exceptions;

public class UnsupportedNotificationChannelException extends RuntimeException {
    public UnsupportedNotificationChannelException(String message) {
        super(message);
    }
}
