package com.chamaai.notificationservice.application.commands;

public record SendEmailOtpCommand(
        String email,
        String otp
) {
}
