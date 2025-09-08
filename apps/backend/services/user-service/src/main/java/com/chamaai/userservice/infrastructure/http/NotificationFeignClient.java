package com.chamaai.userservice.infrastructure.http;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "notification-service", url = "${chama-ai.services.notification-service.url}")
public interface NotificationFeignClient {

    @PostMapping("/api/v1/notification/email/send")
    void sendEmail(String email);

    @PostMapping("/api/v1/notification/whatsapp/send")
    void sendWhatsapp(String phoneNumber);
}
