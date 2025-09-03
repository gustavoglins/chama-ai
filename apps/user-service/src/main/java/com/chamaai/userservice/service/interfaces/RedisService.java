package com.chamaai.userservice.service.interfaces;

public interface RedisService {

    void saveValue(String key, String value);

    String getValue(String key);
}
