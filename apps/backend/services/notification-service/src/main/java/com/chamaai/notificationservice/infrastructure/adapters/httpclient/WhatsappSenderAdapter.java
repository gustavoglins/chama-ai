package com.chamaai.notificationservice.infrastructure.adapters.httpclient;

import com.chamaai.notificationservice.application.commands.out.SendWhatsappCommand;
import com.chamaai.notificationservice.application.ports.out.WhatsappSenderPort;
import org.springframework.stereotype.Component;

@Component
public class WhatsappSenderAdapter implements WhatsappSenderPort {

    private final EvolutionApiRestClient evolutionApiRestClient;

    public WhatsappSenderAdapter(EvolutionApiRestClient evolutionApiRestClient) {
        this.evolutionApiRestClient = evolutionApiRestClient;
    }

    @Override
    public void send(SendWhatsappCommand command) {
        this.evolutionApiRestClient.sendMessage(command.phoneNumber(), command.message());
    }
}
