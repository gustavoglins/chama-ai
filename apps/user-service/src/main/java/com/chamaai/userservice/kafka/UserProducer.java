package com.chamaai.userservice.kafka;

import com.chamaai.userservice.dto.events.UserCreatedEventDTO;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public UserProducer(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendUserCreated(UserCreatedEventDTO event) {
        kafkaTemplate.send("user-created-topic", event);
    }
}
