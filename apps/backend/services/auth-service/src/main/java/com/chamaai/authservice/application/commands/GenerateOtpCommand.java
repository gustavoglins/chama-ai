package com.chamaai.authservice.application.commands;

import jakarta.validation.constraints.NotBlank;

public record GenerateOtpCommand(

        @NotBlank(message = "Login is required")
        String login
) {
}
