package com.chamaai.userservice.domain.enums;

public enum AuthRole {
    COMMON_USER("COMMON_USER"),
    ADMIN("ADMIN");

    private String value;

    AuthRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
