package com.chamaai.notificationservice.application.commands.out;

public record SendWhatsappCommand(
        String phoneNumber,
        String message
) {
}
