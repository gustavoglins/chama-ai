package com.chamaai.userservice.infrastructure.adapters.messaging.kafka;

import com.chamaai.common.dto.SendNotificationRequestDTO;
import com.chamaai.userservice.application.ports.out.NotificationPort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component("kafkaNotificationAdapter")
public class NotificationKafkaAdapter implements NotificationPort {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final String topic = "user-created";

    public NotificationKafkaAdapter(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public <T> void sendEmailNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO) {
        kafkaTemplate.send(topic, sendNotificationRequestDTO);
        System.out.println("Sent event: user created");
    }

    @Override
    public <T> void sendWhatsappNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO) {

    }
}
