package com.chamaai.notificationservice.application.ports.in;

import com.chamaai.notificationservice.application.commands.SendWhatsappOtpCommand;

public interface SendWhatsappOtpUseCase {
    void sendOtp(SendWhatsappOtpCommand command);
}
