package com.chamaai.common.dto;

import com.chamaai.common.enums.NotificationType;

public record SendNotificationRequestDTO<T>(
        NotificationType type,
        String recipient,
        T templateData
) {
}
