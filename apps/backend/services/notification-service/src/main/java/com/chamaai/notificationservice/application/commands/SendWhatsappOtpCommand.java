package com.chamaai.notificationservice.application.commands;

public record SendWhatsappOtpCommand(
        String phoneNumber,
        String otp
) {
}
