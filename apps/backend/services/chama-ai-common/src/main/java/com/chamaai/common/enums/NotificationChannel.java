package com.chamaai.common.enums;

public enum NotificationChannel {
    EMAIL("EMAIL"),
    WHATSAPP("WHATSAPP"),
    SMS("SMS");

    private String value;

    private NotificationChannel(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
