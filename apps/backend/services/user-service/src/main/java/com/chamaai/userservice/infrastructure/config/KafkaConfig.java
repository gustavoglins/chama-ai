package com.chamaai.userservice.infrastructure.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

@Configuration
public class KafkaConfig {

    private final String bootstrapServers;

    // !TODO: configure Kafka properties
    public KafkaConfig(@Value("${}") String bootstrapServers) {
        this.bootstrapServers = bootstrapServers;
    }

    @Bean
    public ProducerFactory<String, String> producerFactory() {
        return null;
    }

    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return null;
    }

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        return null;
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
        return null;
    }
}
