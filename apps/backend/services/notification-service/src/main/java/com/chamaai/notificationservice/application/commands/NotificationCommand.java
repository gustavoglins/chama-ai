package com.chamaai.notificationservice.application.commands;

import com.chamaai.common.enums.NotificationChannel;
import com.chamaai.common.enums.NotificationType;

import java.util.Map;

public record NotificationCommand(
        NotificationChannel channel,
        NotificationType type,
        String recipient,
        Map<String, Object> data
) {
}
