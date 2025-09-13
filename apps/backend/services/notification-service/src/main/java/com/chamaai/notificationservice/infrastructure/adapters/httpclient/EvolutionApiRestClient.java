package com.chamaai.notificationservice.infrastructure.adapters.httpclient;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;

@Component
public class EvolutionApiRestClient {

    //!TODO: implement international phone prefix support
    private static final String BRAZIL_PHONE_PREFIX = "55";

    private final WebClient webClient;
    private final String EVOLUTION_URL;
    private final String EVOLUTION_INSTANCE;
    private final String EVOLUTION_APIKEY;

    public EvolutionApiRestClient(WebClient.Builder webClientBuilder, @Value("${evolution-api.url}") String evolutionUrl, @Value("${evolution-api.instance}") String evolutionInstance, @Value("${evolution-api.apikey}") String evolutionApiKey) {
        this.webClient = webClientBuilder.baseUrl(evolutionUrl).build();
        this.EVOLUTION_URL = evolutionUrl;
        this.EVOLUTION_INSTANCE = evolutionInstance;
        this.EVOLUTION_APIKEY = evolutionApiKey;
    }

    public void sendMessage(String number, String text) {
        try {
            webClient.post()
                    .uri(EVOLUTION_URL + "/message/sendText/" + EVOLUTION_INSTANCE)
                    .headers(headers -> {
                        headers.set("Content-Type", "application/json");
                        headers.set("apikey", EVOLUTION_APIKEY);
                    })
                    .bodyValue(new EvolutionApiMessageRequest(BRAZIL_PHONE_PREFIX + number, text))
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
