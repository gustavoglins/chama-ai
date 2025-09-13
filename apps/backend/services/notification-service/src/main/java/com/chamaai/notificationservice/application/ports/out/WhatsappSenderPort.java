package com.chamaai.notificationservice.application.ports.out;

import com.chamaai.notificationservice.application.commands.out.SendWhatsappCommand;

public interface WhatsappSenderPort {
    //TODO: criar records
    void send(SendWhatsappCommand command);
}
