package com.chamaai.userservice.clients;

import com.chamaai.userservice.dto.requests.SendOtpNotificationRequestDto;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service", url = "http://localhost:8082/api/v1/notification")
public interface NotificationClient {

    @PostMapping("/email/send")
    void sendEmail(@RequestBody @Valid SendOtpNotificationRequestDto request);

    @PostMapping("/whatsapp/send")
    void sendWhatsapp(@RequestBody @Valid SendOtpNotificationRequestDto request);
}
