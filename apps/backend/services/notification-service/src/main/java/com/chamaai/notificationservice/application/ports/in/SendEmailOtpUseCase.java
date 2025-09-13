package com.chamaai.notificationservice.application.ports.in;

import com.chamaai.notificationservice.application.commands.in.SendEmailOtpCommand;

public interface SendEmailOtpUseCase {
    void sendOtp(SendEmailOtpCommand command);
}
