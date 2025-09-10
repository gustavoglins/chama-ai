package com.chamaai.notificationservice.infrastructure.adapters.messaging.kafka;

import com.chamaai.common.dto.SendNotificationRequestDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    private final Logger logger = LoggerFactory.getLogger(NotificationConsumer.class);

    @KafkaListener(topics = "${chama-ai.kafka.topic.user}", groupId = "${chama-ai.kafka.group-id}")
    public void consumer(SendNotificationRequestDTO message) {
        System.out.println("Mensagem recebida no NotificationService: " + message);
        logger.info("Mensagem recebida no NotificationService: " + message);
        logger.info("Mensagem recebida no NotificationService: " + message);
        logger.info("Mensagem recebida no NotificationService: " + message);
    }
}
