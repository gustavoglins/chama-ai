package com.chamaai.notificationservice.application.ports.in;

import com.chamaai.common.dto.UserCreatedEvent;

public interface UserCreatedEventConsumerUseCase {
    void handleUserCreatedEvent(UserCreatedEvent event);
}
