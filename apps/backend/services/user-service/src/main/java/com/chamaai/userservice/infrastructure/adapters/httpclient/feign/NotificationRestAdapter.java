package com.chamaai.userservice.infrastructure.adapters.httpclient.feign;

import com.chamaai.common.dto.requests.SendNotificationRequestDTO;
import com.chamaai.userservice.application.ports.out.NotificationRestPort;
import org.springframework.stereotype.Component;

@Component
public class NotificationRestAdapter implements NotificationRestPort {

    private final NotificationFeignClient notificationFeignClient;

    public NotificationRestAdapter(NotificationFeignClient notificationFeignClient) {
        this.notificationFeignClient = notificationFeignClient;
    }

    @Override
    public void sendEmailNotification(SendNotificationRequestDTO sendNotificationRequestDTO) {
        this.notificationFeignClient.sendEmail(sendNotificationRequestDTO);
    }

    @Override
    public void sendWhatsappNotification(SendNotificationRequestDTO sendNotificationRequestDTO) {
        this.notificationFeignClient.sendWhatsappMessage(sendNotificationRequestDTO);
    }
}
