package com.chamaai.apigateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
public class LoggingFilter implements WebFilter {

    private static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String correlationId = exchange
                .getRequest()
                .getHeaders()
                .getFirst("X-Correlation-ID");

        if (correlationId == null) {
            correlationId = UUID.randomUUID().toString();
        }

        log.info("[{}] Incoming request: {} {}", correlationId, exchange.getRequest().getMethod(), exchange.getRequest().getURI());

        String finalCorrelationId = correlationId;
        return chain.filter(exchange)
                .doOnSuccess(aVoid -> log.info("[{}] Response completed: {}", finalCorrelationId, exchange.getResponse().getStatusCode()));
    }
}
