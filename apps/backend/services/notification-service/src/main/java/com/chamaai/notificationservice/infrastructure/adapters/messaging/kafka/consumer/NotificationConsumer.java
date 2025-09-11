package com.chamaai.notificationservice.infrastructure.adapters.messaging.kafka.consumer;

import com.chamaai.common.dto.UserCreatedEvent;
import com.chamaai.notificationservice.application.ports.in.UserCreatedEventConsumerUseCase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    private final Logger logger = LoggerFactory.getLogger(NotificationConsumer.class);
    private final UserCreatedEventConsumerUseCase userCreatedEventConsumerUseCase;

    public NotificationConsumer(UserCreatedEventConsumerUseCase userCreatedEventConsumerUseCase) {
        this.userCreatedEventConsumerUseCase = userCreatedEventConsumerUseCase;
    }

    @KafkaListener(topics = "${chama-ai.kafka.topic.user}", groupId = "${chama-ai.kafka.group-id}")
    public void consumerUserCreatedEvent(UserCreatedEvent event) {
        logger.info("Mensagem recebida no NotificationService: {}", event);
        this.userCreatedEventConsumerUseCase.handleUserCreatedEvent(event);
        logger.info("Mensagem processada no NotificationService");
    }
}
