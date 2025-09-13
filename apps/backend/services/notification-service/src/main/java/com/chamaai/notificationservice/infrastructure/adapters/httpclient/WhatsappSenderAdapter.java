package com.chamaai.notificationservice.infrastructure.adapters.httpclient;

import com.chamaai.notificationservice.application.ports.out.WhatsappSenderPort;
import org.springframework.stereotype.Component;

@Component
public class WhatsappSenderAdapter implements WhatsappSenderPort {

    private final EvolutionApiRestClient evolutionApiRestClient;

    public WhatsappSenderAdapter(EvolutionApiRestClient evolutionApiRestClient) {
        this.evolutionApiRestClient = evolutionApiRestClient;
    }

    @Override
    public void send(String phoneNumber, String message) {
        this.evolutionApiRestClient.sendMessage(phoneNumber, message);
    }
}
