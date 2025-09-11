package com.chamaai.common.enums;

public enum KafkaTopics {
    USER_CREATED("user_created");

    private String value;

    private KafkaTopics(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
