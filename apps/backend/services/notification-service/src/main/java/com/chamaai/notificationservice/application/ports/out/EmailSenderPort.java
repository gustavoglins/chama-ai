package com.chamaai.notificationservice.application.ports.out;

import com.chamaai.common.dto.UserCreatedEvent;

public interface EmailSenderPort {
    void sendWelcomeEmail(UserCreatedEvent data);
}
