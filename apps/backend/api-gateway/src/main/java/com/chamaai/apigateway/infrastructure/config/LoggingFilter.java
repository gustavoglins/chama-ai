package com.chamaai.apigateway.infrastructure.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class LoggingFilter implements GlobalFilter, Ordered {

    private final Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {
//        System.out.println("Incoming request: " + exchange.getRequest().getMethod() + " " + exchange.getRequest().getURI());
        logger.info("Incoming request: {} {}", exchange.getRequest().getMethod(), exchange.getRequest().getURI());
//        return chain.filter(exchange).doOnSuccess(aVoid -> System.out.println("Response status: " + exchange.getResponse().getStatusCode()));
        return chain.filter(exchange).doOnSuccess(aVoid -> logger.info("Response status: {}", exchange.getResponse().getStatusCode()));
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
