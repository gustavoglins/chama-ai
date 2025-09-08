package com.chamaai.userservice.application.dto.responses;

public enum ApiResponseStatus {
    SUCCESS("SUCCESS"),
    ERROR("ERROR");

    private String value;

    ApiResponseStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
