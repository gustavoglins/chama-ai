package com.chamaai.userservice.infrastructure.adapters.messaging.kafka.producer;

import com.chamaai.common.dto.UserCreatedEvent;
import com.chamaai.userservice.application.ports.out.DomainEventPublisherPort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KafkaEventPublisherAdapter implements DomainEventPublisherPort {

    private final Logger logger = LoggerFactory.getLogger(KafkaEventPublisherAdapter.class);
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final String userCreatedTopic;

    public KafkaEventPublisherAdapter(KafkaTemplate<String, Object> kafkaTemplate, @Value("${chama-ai.kafka.topic.userCreated}") String userCreatedTopic) {
        this.kafkaTemplate = kafkaTemplate;
        this.userCreatedTopic = userCreatedTopic;
    }

    @Override
    public void publishUserCreatedEvent(UserCreatedEvent event) {
        this.kafkaTemplate.send(this.userCreatedTopic, event.userId(), event)
                .whenComplete((recordMetadata, exception) -> {
                    if (exception != null) {
                        //TODO: implement retry
                        logger.error("Error sending Event: UserCreated: {}", exception.getMessage());
                    } else {
                        //TODO: implement real logic
                        logger.info("Event: UserCreated sent successfully");
                    }
                });
    }
}
