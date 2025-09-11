package com.chamaai.common.dto;

public record UserCreatedEvent(
        String userId, String email, String name
) {
}
