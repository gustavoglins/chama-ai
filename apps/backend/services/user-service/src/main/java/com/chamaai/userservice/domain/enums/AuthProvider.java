package com.chamaai.userservice.domain.enums;

public enum AuthProvider {
    LOCAL("LOCAL"),
    GOOGLE("GOOGLE");

    private String value;

    AuthProvider(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
