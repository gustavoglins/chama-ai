package com.chamaai.apigateway.infrastructure.config;

import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.timelimiter.TimeLimiterConfig;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Configuration
public class GatewayConfig {

    private static final int RETRIES_LIMIT_VALUE = 3;
    private static final Duration GLOBAL_TIMEOUT = Duration.ofSeconds(5);

    private final RedisRateLimiter redisRateLimiter;

    public GatewayConfig(RedisRateLimiter redisRateLimiter) {
        this.redisRateLimiter = redisRateLimiter;
    }

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // User Service
                .route("user-service", r -> r.path("/users/**")
                        .filters(f -> f
                                .retry(RETRIES_LIMIT_VALUE)
                                .setPath("forward:/fallback/user")
                                .circuitBreaker(c -> c
                                        .setName("userServiceCB")
                                        .setFallbackUri("forward:/fallback/user")
                                        .setRouteId("user-service"))
                                .requestRateLimiter(c -> c.setRateLimiter(this.redisRateLimiter))
                                .addResponseHeader("X-Gateway", "UserService")
                                .filter((exchange, chain) -> chain.filter(exchange)
                                        .timeout(GLOBAL_TIMEOUT)
                                        .onErrorResume(throwable -> Mono.error(new RuntimeException("Timeout reached")))))
                        .uri("lb://user-service"))
                // Notification Service
                .route("notification-service", r -> r.path("/notifications/**")
                        .filters(f -> f
                                .retry(RETRIES_LIMIT_VALUE)
                                .setPath("forward:/fallback/notification")
                                .circuitBreaker(c -> c
                                        .setName("notificationServiceCB")
                                        .setFallbackUri("forward:/fallback/notification")
                                        .setRouteId("notification-service"))
                                .requestRateLimiter(c -> c.setRateLimiter(this.redisRateLimiter))
                                .addResponseHeader("X-Gateway", "NotificationService")
                                .filter((exchange, chain) -> chain.filter(exchange)
                                        .timeout(GLOBAL_TIMEOUT)
                                        .onErrorResume(throwable -> Mono.error(new RuntimeException("Timeout reached")))))
                        .uri("lb://notification-service"))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> fallbackRoute() {
        return RouterFunctions.route()
                .GET("/fallback/user", request ->
                        ServerResponse.status(HttpStatus.SERVICE_UNAVAILABLE)
                                .bodyValue("User service is temporarily unavailable"))
                .GET("/fallback/notification", request ->
                        ServerResponse.status(HttpStatus.SERVICE_UNAVAILABLE)
                                .bodyValue("Notification service is temporarily unavailable"))
                .build();
    }

    @Bean
    public CircuitBreakerConfig customCircuitBreakerConfig() {
        return CircuitBreakerConfig.custom()
                .failureRateThreshold(50)
                .waitDurationInOpenState(Duration.ofSeconds(30))
                .slidingWindowSize(10)
                .build();
    }

    @Bean
    public TimeLimiterConfig customTimeLimiterConfig() {
        return TimeLimiterConfig.custom()
                .timeoutDuration(GLOBAL_TIMEOUT)
                .build();
    }

    @Bean
    public GlobalFilter loggingFilter() {
        return (exchange, chain) -> {
            System.out.println("Incoming request: " + exchange.getRequest().getMethod() + " " + exchange.getRequest().getURI());
            return chain.filter(exchange)
                    .doOnSuccess(aVoid -> System.out.println("Response status: " + exchange.getResponse().getStatusCode()));
        };
    }
}
