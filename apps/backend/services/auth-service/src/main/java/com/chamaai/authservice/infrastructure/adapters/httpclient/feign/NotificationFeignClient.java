package com.chamaai.authservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.common.dto.requests.SendNotificationRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "notification-service", url = "${chama-ai.service-discovery.url}/notification-service")
public interface NotificationFeignClient {

    @PostMapping("/api/v1/notifications/email/send")
    void sendEmail(SendNotificationRequestDTO sendNotificationRequestDTO);

    @PostMapping("/api/v1/notifications/whatsapp/send")
    void sendWhatsappMessage(SendNotificationRequestDTO sendNotificationRequestDTO);
}
