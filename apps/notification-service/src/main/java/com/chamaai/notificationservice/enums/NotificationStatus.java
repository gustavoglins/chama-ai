package com.chamaai.notificationservice.enums;

public enum NotificationStatus {
    PENDING("pending"),
    SENT("sent"),
    FAILED("failed");

    private String value;

    private NotificationStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
