package com.chamaai.notificationservice.application.ports.in;

import com.chamaai.common.dto.responses.UserCreatedEvent;

public interface UserCreatedEventConsumerUseCase {
    void handleUserCreatedEvent(UserCreatedEvent event);
}
