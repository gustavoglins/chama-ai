package com.chamaai.notificationservice.application.ports.out;

import com.chamaai.notificationservice.application.commands.out.SendEmailCommand;

public interface EmailSenderPort {
    void send(SendEmailCommand command);
}
