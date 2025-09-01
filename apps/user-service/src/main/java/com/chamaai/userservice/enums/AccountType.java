package com.chamaai.userservice.enums;

public enum AccountType {

    CLIENT("client"),
    SERVICE_PROVIDER("service_provider");

    private String value;

    AccountType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
