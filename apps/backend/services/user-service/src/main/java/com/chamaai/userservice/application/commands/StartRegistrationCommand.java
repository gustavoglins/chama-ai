package com.chamaai.userservice.application.commands;

import jakarta.validation.constraints.NotBlank;

public record StartRegistrationCommand(

        @NotBlank(message = "Login is required")
        String login
) {
}
