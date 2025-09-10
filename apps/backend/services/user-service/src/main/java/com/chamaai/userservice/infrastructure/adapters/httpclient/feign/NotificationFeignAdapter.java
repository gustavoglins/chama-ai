package com.chamaai.userservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.common.dto.SendNotificationRequestDTO;
import com.chamaai.userservice.application.ports.out.NotificationPort;
import org.springframework.stereotype.Component;

@Component
public class NotificationFeignAdapter implements NotificationPort {

    private final NotificationFeignClient notificationFeignClient;

    public NotificationFeignAdapter(NotificationFeignClient notificationFeignClient) {
        this.notificationFeignClient = notificationFeignClient;
    }

    @Override
    public <T> void sendEmailNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO) {
        this.notificationFeignClient.sendEmail(sendNotificationRequestDTO);
    }

    @Override
    public <T> void sendWhatsappNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO) {
        this.notificationFeignClient.sendWhatsappMessage(sendNotificationRequestDTO);
    }
}
