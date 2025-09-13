package com.chamaai.common.dto.requests;

import com.chamaai.common.enums.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record SendNotificationRequestDTO(

        @NotNull(message = "Type is required")
        NotificationType type,

        @NotBlank(message = "Recipient is required")
        String recipient,

        Map<String, Object> templateData
) {
}
