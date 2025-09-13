package com.chamaai.notificationservice.domain.enums;

public enum EmailTemplate {
    OTP("otp"),
    WELCOME("welcome"),
    RESET_PASSWORD("reset_password");

    private final String value;

    EmailTemplate(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
