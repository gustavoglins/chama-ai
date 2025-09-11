package com.chamaai.userservice.domain.events;

import java.time.Instant;

public class UserCreatedEvent {

    private final String userId;
    private final String email;
    private final String firstName;
    private final Instant occurredAt;

    public UserCreatedEvent(String userId, String email, String firstName) {
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.occurredAt = Instant.now();
    }

    public String getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }

    public Instant getOccurredAt() {
        return occurredAt;
    }

    public String getFirstName() {
        return firstName;
    }
}
