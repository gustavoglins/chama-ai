package com.chamaai.notificationservice.application.ports.in;

import com.chamaai.notificationservice.application.commands.NotificationCommand;

public interface NotificationOrchestratorUseCase {
    void send(NotificationCommand command);
}
