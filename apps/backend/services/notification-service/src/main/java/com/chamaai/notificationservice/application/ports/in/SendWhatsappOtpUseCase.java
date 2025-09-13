package com.chamaai.notificationservice.application.ports.in;

import com.chamaai.notificationservice.application.commands.in.SendWhatsappOtpCommand;

public interface SendWhatsappOtpUseCase {
    void sendOtp(SendWhatsappOtpCommand command);
}
