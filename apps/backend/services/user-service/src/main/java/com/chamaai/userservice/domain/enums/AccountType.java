package com.chamaai.userservice.domain.enums;

public enum AccountType {
    CLIENT("CLIENT"),
    SERVICE_PROVIDER("SERVICE_PROVIDER");

    private String value;

    AccountType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
