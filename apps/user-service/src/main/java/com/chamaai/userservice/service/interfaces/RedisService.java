package com.chamaai.userservice.service.interfaces;

import java.util.concurrent.TimeUnit;

public interface RedisService {

    void saveValue(String key, String value, long expiration, TimeUnit timeUnit);

    String getValue(String key);

    void deleteValue(String key);
}
