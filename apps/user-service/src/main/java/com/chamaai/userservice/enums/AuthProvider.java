package com.chamaai.userservice.enums;

public enum AuthProvider {

    LOCAL("local"),
    GOOGLE("google");

    private String value;

    AuthProvider(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
