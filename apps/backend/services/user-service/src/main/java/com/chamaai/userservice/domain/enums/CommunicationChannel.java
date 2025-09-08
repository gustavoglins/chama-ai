package com.chamaai.userservice.domain.enums;

public enum CommunicationChannel {
    EMAIL("EMAIL"),
    WHATSAPP("WHATSAPP");

    private String value;

    CommunicationChannel(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
