package com.chamaai.userservice.application.ports.out;

import com.chamaai.common.dto.responses.UserCreatedEvent;

public interface DomainEventPublisherPort {
    void publishUserCreatedEvent(UserCreatedEvent event);
}
