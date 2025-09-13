package com.chamaai.common.enums;

public enum NotificationType {
    WELCOME("WELCOME"),
    OTP_VERIFICATION("OTP_VERIFICATION"),
    PASSWORD_RESET("PASSWORD_RESET");

    private String value;

    private NotificationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
