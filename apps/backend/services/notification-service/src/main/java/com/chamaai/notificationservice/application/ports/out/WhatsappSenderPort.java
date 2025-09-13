package com.chamaai.notificationservice.application.ports.out;

public interface WhatsappSenderPort {
    void send(String phoneNumber, String message);
}
