package com.chamaai.userservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.common.dto.requests.SendNotificationRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "notification-service", url = "${chama-ai.services.notification-service.url}")
public interface NotificationFeignClient {

    @PostMapping("/api/v1/notifications/email/send")
    void sendEmail(SendNotificationRequestDTO sendNotificationRequestDTO);

    @PostMapping("/api/v1/notifications/whatsapp/send")
    void sendWhatsappMessage(SendNotificationRequestDTO sendNotificationRequestDTO);
}
