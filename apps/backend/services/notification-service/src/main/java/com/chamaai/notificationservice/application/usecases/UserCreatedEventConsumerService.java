package com.chamaai.notificationservice.application.usecases;

import com.chamaai.common.dto.responses.UserCreatedEvent;
import com.chamaai.notificationservice.application.ports.in.UserCreatedEventConsumerUseCase;
import com.chamaai.notificationservice.application.ports.out.EmailSenderPort;
import com.chamaai.notificationservice.domain.enums.EmailTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserCreatedEventConsumerService implements UserCreatedEventConsumerUseCase {

    private final EmailSenderPort emailSenderPort;

    public UserCreatedEventConsumerService(EmailSenderPort emailSenderPort) {
        this.emailSenderPort = emailSenderPort;
    }

    @Override
    public void handleUserCreatedEvent(UserCreatedEvent event) {
        emailSenderPort.send(EmailTemplate.WELCOME, event.email(), "Chama Aí | Bem vindo(a)", event.name());
    }
}
