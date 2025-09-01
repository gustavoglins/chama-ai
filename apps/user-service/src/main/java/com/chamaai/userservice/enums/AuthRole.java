package com.chamaai.userservice.enums;

public enum AuthRole {

    COMMON_USER("common_user"),
    MODERATOR("moderator"),
    ADMIN("admin");

    private String value;

    AuthRole(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
