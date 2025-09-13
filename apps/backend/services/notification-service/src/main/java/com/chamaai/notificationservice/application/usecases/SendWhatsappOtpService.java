package com.chamaai.notificationservice.application.usecases;

import com.chamaai.notificationservice.application.commands.SendWhatsappOtpCommand;
import com.chamaai.notificationservice.application.ports.in.SendWhatsappOtpUseCase;
import com.chamaai.notificationservice.application.ports.out.WhatsappSenderPort;
import org.springframework.stereotype.Service;

@Service
public class SendWhatsappOtpService implements SendWhatsappOtpUseCase {

    private final WhatsappSenderPort whatsappSenderPort;

    public SendWhatsappOtpService(WhatsappSenderPort whatsappSenderPort) {
        this.whatsappSenderPort = whatsappSenderPort;
    }

    @Override
    public void sendOtp(SendWhatsappOtpCommand command) {
        String message = "Chama Aí \n\n" + command.otp() + " é o seu código de acesso. \n\nSe você não tentou iniciar sessão, recomendamos que você redefina a sua senha.";
        this.whatsappSenderPort.send(command.phoneNumber(), message);
    }
}
