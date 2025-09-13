package com.chamaai.notificationservice.infrastructure.adapters.messaging.kafka.consumer;

import com.chamaai.common.dto.responses.UserCreatedEvent;
import com.chamaai.notificationservice.application.ports.in.UserCreatedEventConsumerUseCase;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    private final Logger logger = LoggerFactory.getLogger(NotificationConsumer.class);
    private final UserCreatedEventConsumerUseCase userCreatedEventConsumerUseCase;

    public NotificationConsumer(UserCreatedEventConsumerUseCase userCreatedEventConsumerUseCase) {
        this.userCreatedEventConsumerUseCase = userCreatedEventConsumerUseCase;
    }

    @KafkaListener(topics = "${chama-ai.kafka.topic.user}", groupId = "${chama-ai.kafka.group-id}")
    public void consumeUserCreatedEvent(ConsumerRecord<String, UserCreatedEvent> record) {
        UserCreatedEvent event = record.value();
        String key = record.key();
        logger.info("Message received. topic={}, partition={}, offset={}, key={}", record.topic(), record.partition(), record.offset(), key);
        try {
            userCreatedEventConsumerUseCase.handleUserCreatedEvent(event);
            logger.info("Message processed successfully. key={}", key);
        } catch (Exception e) {
            logger.error("Error processing message. topic={}, partition={}, offset={}, key={}, error={}", record.topic(), record.partition(), record.offset(), key, e.getMessage(), e);
        }
    }
}
