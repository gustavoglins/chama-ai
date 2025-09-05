package com.chamaai.notificationservice.clients;

import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;

import java.math.BigInteger;

@Component
public class EvolutionApiClient {

    private final WebClient webClient;
    private final String EVOLUTION_URL;
    private final String EVOLUTION_INSTANCE;
    private final String EVOLUTION_APIKEY;

    public EvolutionApiClient(WebClient.Builder webClientBuilder, @Value("${evolution-api.url}") String evolutionUrl, @Value("${evolution-api.instance}") String evolutionInstance, @Value("${evolution-api.apikey}") String evolutionApiKey) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8080").build();
        this.EVOLUTION_URL = evolutionUrl;
        this.EVOLUTION_INSTANCE = evolutionInstance;
        this.EVOLUTION_APIKEY = evolutionApiKey;
    }

    public void sendMessage(BigInteger number, String text) {
        try {
            webClient.post()
                    .uri(EVOLUTION_URL+"/message/sendText/"+EVOLUTION_INSTANCE)
                    .headers(headers -> {
                        headers.set("Content-Type", "application/json");
                        headers.set("apikey", EVOLUTION_APIKEY);
                    })
                    .bodyValue(new EvolutionApiMessageRequest(String.valueOf(number), text))
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (WebClientException exception) {
            throw new RuntimeException("Error sending message to Evolution API", exception);
        }
    }

    private record EvolutionApiMessageRequest(String number, String text) {
    }
}
