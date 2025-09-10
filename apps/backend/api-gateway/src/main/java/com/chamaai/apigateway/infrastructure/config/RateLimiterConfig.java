package com.chamaai.apigateway.infrastructure.config;

import org.springframework.cloud.gateway.filter.ratelimit.RedisRateLimiter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RateLimiterConfig {

    private static final int REQUESTS_LIMIT_VALUE = 10; // replenishRate = how many requests per second
    private static final int BURST_CAPACITY_VALUE = 20; // burstCapacity = how many requests can overflow the limit

    @Bean
    public RedisRateLimiter redisRateLimiter() {
        return new RedisRateLimiter(REQUESTS_LIMIT_VALUE, BURST_CAPACITY_VALUE);
    }
}
