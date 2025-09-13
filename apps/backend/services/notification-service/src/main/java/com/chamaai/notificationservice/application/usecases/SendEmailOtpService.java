package com.chamaai.notificationservice.application.usecases;

import com.chamaai.notificationservice.application.commands.SendEmailOtpCommand;
import com.chamaai.notificationservice.application.ports.in.SendEmailOtpUseCase;
import com.chamaai.notificationservice.application.ports.out.EmailSenderPort;
import com.chamaai.notificationservice.domain.enums.EmailTemplate;
import org.springframework.stereotype.Service;

@Service
public class SendEmailOtpService implements SendEmailOtpUseCase {

    private final EmailSenderPort emailSenderPort;

    public SendEmailOtpService(EmailSenderPort emailSenderPort) {
        this.emailSenderPort = emailSenderPort;
    }

    @Override
    public void sendOtp(SendEmailOtpCommand command) {
        this.emailSenderPort.send(EmailTemplate.OTP, command.email(), "Chama Aí | Código de Acesso", command.otp());
    }
}
