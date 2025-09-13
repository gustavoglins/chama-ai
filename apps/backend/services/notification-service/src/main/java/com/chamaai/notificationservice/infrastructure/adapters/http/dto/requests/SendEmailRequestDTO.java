package com.chamaai.notificationservice.infrastructure.adapters.http.dto.requests;

import com.chamaai.common.enums.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record SendEmailRequestDTO(

        @NotNull(message = "Type is required")
        NotificationType type,

        @NotBlank(message = "Email is required")
        String email,

        @NotNull(message = "OTP is required")
        Map<String, Object> data
) {
}
