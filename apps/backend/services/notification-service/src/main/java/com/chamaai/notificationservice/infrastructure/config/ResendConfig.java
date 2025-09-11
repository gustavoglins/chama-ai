package com.chamaai.notificationservice.infrastructure.config;

import com.resend.Resend;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResendConfig {

    @Value("${resend.apikey}")
    private String apikey;

    @Bean
    public Resend resend() {
        return new Resend(apikey);
    }
}
