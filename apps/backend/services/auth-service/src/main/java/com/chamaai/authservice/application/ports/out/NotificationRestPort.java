package com.chamaai.authservice.application.ports.out;

import com.chamaai.common.dto.SendNotificationRequestDTO;

public interface NotificationRestPort {
    <T> void sendEmailNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO);

    <T> void sendWhatsappNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO);
}
