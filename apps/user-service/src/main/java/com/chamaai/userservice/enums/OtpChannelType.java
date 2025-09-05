package com.chamaai.userservice.enums;

public enum OtpChannelType {
    EMAIL("email"),
    WHATSAPP("whatsapp");

    private String value;

    OtpChannelType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
