package com.chamaai.common.enums;

public enum TokenPurpose {
    SESSION("SESSION"),
    PASSWORD_RESET("PASSWORD_RESET"),
    OTP_VERIFICATION("OTP_VERIFICATION"),
    ACCOUNT_CREATION("ACCOUNT_CREATION");

    private String value;

    TokenPurpose(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
