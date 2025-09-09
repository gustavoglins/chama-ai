package com.chamaai.userservice.application.ports.out;

import com.chamaai.common.dto.SendNotificationRequestDTO;

public interface NotificationPort {
    <T> void sendEmailNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO);
    <T> void sendWhatsappNotification(SendNotificationRequestDTO<T> sendNotificationRequestDTO);
}
