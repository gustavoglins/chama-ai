package com.chamaai.notificationservice.application.usecases;

import com.chamaai.common.enums.NotificationChannel;
import com.chamaai.common.enums.NotificationType;
import com.chamaai.notificationservice.application.commands.NotificationCommand;
import com.chamaai.notificationservice.application.commands.SendEmailOtpCommand;
import com.chamaai.notificationservice.application.exceptions.UnsupportedNotificationChannelException;
import com.chamaai.notificationservice.application.exceptions.UnsupportedNotificationTypeException;
import com.chamaai.notificationservice.application.ports.in.NotificationOrchestratorUseCase;
import org.springframework.stereotype.Service;

@Service
public class NotificationOrchestratorService implements NotificationOrchestratorUseCase {

    private final SendEmailOtpService sendEmailOtpUseCase;

    public NotificationOrchestratorService(SendEmailOtpService sendEmailOtpUseCase) {
        this.sendEmailOtpUseCase = sendEmailOtpUseCase;
    }

    @Override
    public void send(NotificationCommand command) {
        switch (command.channel()) {
            case NotificationChannel.EMAIL -> handleEmail(command);
            case NotificationChannel.WHATSAPP -> handleWhatsapp(command);
            default ->
                    throw new UnsupportedNotificationChannelException("Unsupported notification channel: " + command.channel());
        }
    }

    private void handleEmail(NotificationCommand command) {
        switch (command.type()) {
//            case NotificationType.LOGIN_VERIFICATION -> sendEmailOtpUseCase.send(command);
            case NotificationType.OTP_VERIFICATION ->
                    this.sendEmailOtpUseCase.sendOtp(new SendEmailOtpCommand(command.recipient(), command.data().get("otp").toString()));
            default ->
                    throw new UnsupportedNotificationTypeException("Unsupported notification type: " + command.type());
        }
    }

    private void handleWhatsapp(NotificationCommand command) {

    }
}
