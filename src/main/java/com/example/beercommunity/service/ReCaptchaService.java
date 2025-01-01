package com.example.beercommunity.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ReCaptchaService {

    private final String RECAPTCHA_SECRET_KEY = "6LelWM0pAAAAAM6qTHwsnfAMRkECQXA6XilRdHIS";

    private final String REACPTCHA_VALIDATION_LINK = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";

    @SuppressWarnings("null")
    public Boolean validateReCaptcha(String token){
        RestTemplate restTemplate = new RestTemplate();
            String url = String.format(
                    REACPTCHA_VALIDATION_LINK,
                    RECAPTCHA_SECRET_KEY,
                    token);

            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, null, String.class);
            if (responseEntity != null && responseEntity.hasBody()
                    && responseEntity.getBody().contains("\"success\": true"))
                return true;
            else
                return false;
    }
}
