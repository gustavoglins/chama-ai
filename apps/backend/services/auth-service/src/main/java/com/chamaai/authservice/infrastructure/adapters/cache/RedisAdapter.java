package com.chamaai.authservice.infrastructure.adapters.cache;

import com.chamaai.authservice.application.ports.out.CachePort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
public class RedisAdapter implements CachePort {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisAdapter(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void setItem(String key, Object value, int ttlInSeconds) {
        redisTemplate.opsForValue().set(key, value, Duration.ofSeconds(ttlInSeconds));
    }

    @Override
    public Object getItem(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public void deleteItem(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public void deleteAllItems() {
        redisTemplate.delete(redisTemplate.keys("*"));
    }
}
