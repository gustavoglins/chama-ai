package com.chamaai.authservice.application.ports.out;

public interface CachePort {
    void setItem(String key, Object value, int ttlInSeconds);

    Object getItem(String key);

    void deleteItem(String key);

    void deleteAllItems();
}
