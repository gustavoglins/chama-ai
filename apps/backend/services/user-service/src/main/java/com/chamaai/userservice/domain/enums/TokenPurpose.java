package com.chamaai.userservice.domain.enums;

public enum TokenPurpose {
    SESSION("SESSION"),
    PASSWORD_RESET("PASSWORD_RESET"),
    EMAIL_VERIFICATION("EMAIL_VERIFICATION");

    private String value;

    TokenPurpose(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
