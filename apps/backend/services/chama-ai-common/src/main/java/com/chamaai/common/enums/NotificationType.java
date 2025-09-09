package com.chamaai.common.enums;

public enum NotificationType {
    WELCOME("WELCOME"),
    PASSWORD_RESET("PASSWORD_RESET"),
    EMAIL_VERIFICATION("EMAIL_VERIFICATION");

    private String value;

    private NotificationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
