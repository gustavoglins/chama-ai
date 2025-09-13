package com.chamaai.authservice.application.ports.out;

import com.chamaai.common.dto.requests.SendNotificationRequestDTO;

public interface NotificationRestPort {
    void sendEmailNotification(SendNotificationRequestDTO sendNotificationRequestDTO);

    void sendWhatsappNotification(SendNotificationRequestDTO sendNotificationRequestDTO);
}
