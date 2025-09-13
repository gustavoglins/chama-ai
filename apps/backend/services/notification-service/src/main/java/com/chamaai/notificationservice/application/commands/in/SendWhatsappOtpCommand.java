package com.chamaai.notificationservice.application.commands.in;

public record SendWhatsappOtpCommand(
        String phoneNumber,
        String otp
) {
}
