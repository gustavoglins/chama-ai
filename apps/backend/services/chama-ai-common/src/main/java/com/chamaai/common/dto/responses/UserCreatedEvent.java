package com.chamaai.common.dto.responses;

public record UserCreatedEvent(
        String userId, String email, String name
) {
}
