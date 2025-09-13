package com.chamaai.notificationservice.application.commands.in;

public record SendEmailOtpCommand(
        String email,
        String otp
) {
}
