package com.chamaai.notificationservice.enums;

public enum NotificationChannel {
    EMAIL("email"),
    SMS("sms"),
    WHATSAPP("whatsapp");

    private String value;

    private NotificationChannel(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
