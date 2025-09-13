package com.chamaai.authservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.common.dto.SendNotificationRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;

@Component
@FeignClient(name = "notification-service", url = "${chama-ai.services.notification-service.url}")
public interface NotificationFeignClient {

    @PostMapping("/api/v1/notifications/email")
    <T> void sendEmail(SendNotificationRequestDTO<T> sendNotificationRequestDTO);

    @PostMapping("/api/v1/notifications/whatsapp")
    <T> void sendWhatsappMessage(SendNotificationRequestDTO<T> sendNotificationRequestDTO);
}
