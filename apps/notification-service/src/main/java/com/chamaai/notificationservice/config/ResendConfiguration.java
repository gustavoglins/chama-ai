package com.chamaai.notificationservice.config;

import com.resend.Resend;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ResendConfiguration {

    @Value("${resend.apikey}")
    private String apikey;

    @Bean
    public Resend resend() {
        return new Resend(apikey);
    }
}
