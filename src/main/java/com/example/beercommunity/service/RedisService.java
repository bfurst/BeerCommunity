package com.example.beercommunity.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    private final ObjectMapper objectMapper;

    private final String RATE_LIMIT_KEY_PREFIX = "request_limit:";

    private final int MAX_DAILY_EMAILS = 5;

    private final long EMAIL_TIME_WINDOW = 86400;

    public RedisService(RedisTemplate<String, Object> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public String generateKey(String id) {
        return String.format("user:%s", id);
    }

    public String generateKey(String id, String token) {
        return String.format("user:%s:%s", id, token);
    }

    public void saveData(String key, Object value, Integer timeout) {
        redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.HOURS);
    }

    public void saveData(String id, String token, String tokenType) throws JsonProcessingException {
        Map<String, String> tokenData = new HashMap<>();
        tokenData.put("tokenType", tokenType);

        String redisKey = generateKey(id, token);
        String jsonData = objectMapper.writeValueAsString(tokenData);
        saveData(redisKey, jsonData, 24);
    }

    public void saveData(String id, String token, String tokenType, String email) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> tokenData = new HashMap<>();
        tokenData.put("tokenType", tokenType);
        tokenData.put("email", email);

        String jsonData = objectMapper.writeValueAsString(tokenData);
        String redisKey = generateKey(id, token);
        saveData(redisKey, jsonData, 24);
    }

    public Map<String, Object> getData(String key) throws JsonProcessingException {
        String jsonData = (String) redisTemplate.opsForValue().get(key);
        if (jsonData != null)
            return objectMapper.readValue(jsonData, new TypeReference<Map<String, Object>>() {
            });
        else
            return Collections.emptyMap();

    }

    public Set<String> getKeys(String pattern) {
        return redisTemplate.keys(pattern);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    public Boolean requestLimitReached(String userIpAddress) {
        String key = RATE_LIMIT_KEY_PREFIX + generateKey(userIpAddress);
        Object currentRequestCount = redisTemplate.opsForValue().get(key);

        if (currentRequestCount != null && Long.parseLong(currentRequestCount.toString()) == MAX_DAILY_EMAILS)
            return true;
        else
            return false;
    }

    @SuppressWarnings("null")
    public void recordUserRequest(String userIpAddress) {
        String key = RATE_LIMIT_KEY_PREFIX + generateKey(userIpAddress);
        Long requestCount = redisTemplate.opsForValue().increment(key);

        if (requestCount == 1)
            redisTemplate.expire(key, EMAIL_TIME_WINDOW, TimeUnit.SECONDS);
    }
}
