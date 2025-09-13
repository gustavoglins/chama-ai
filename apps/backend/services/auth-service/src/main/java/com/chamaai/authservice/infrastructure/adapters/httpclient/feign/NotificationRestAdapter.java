package com.chamaai.authservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.authservice.application.ports.out.NotificationRestPort;
import com.chamaai.common.dto.SendNotificationRequestDTO;
import org.springframework.stereotype.Component;

@Component
public class NotificationRestAdapter implements NotificationRestPort {

    private final NotificationFeignClient notificationFeignClient;

    public NotificationRestAdapter(NotificationFeignClient notificationFeignClient) {
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
