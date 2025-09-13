package com.chamaai.authservice.application.usecase;

import com.chamaai.authservice.application.commands.GenerateOtpCommand;
import com.chamaai.authservice.application.ports.in.GenerateOtpUseCase;
import com.chamaai.authservice.application.ports.out.NotificationRestPort;
import com.chamaai.common.dto.SendNotificationRequestDTO;
import com.chamaai.common.enums.NotificationType;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class GenerateOtpUseCaseImpl implements GenerateOtpUseCase {

    private final NotificationRestPort notificationRestPort;

    public GenerateOtpUseCaseImpl(NotificationRestPort notificationRestPort) {
        this.notificationRestPort = notificationRestPort;
    }

    @Override
    public void generateOTP(GenerateOtpCommand generateOtpCommand) {
        int otpCode = ThreadLocalRandom.current().nextInt(100000, 999999);
        if (generateOtpCommand.login().contains("@")) {
            this.notificationRestPort.sendEmailNotification(new SendNotificationRequestDTO<>(
                    NotificationType.OTP_VERIFICATION,
                    generateOtpCommand.login(),
                    Map.of("otp", otpCode)
            ));
        } else {
            this.notificationRestPort.sendWhatsappNotification(new SendNotificationRequestDTO<>(
                    NotificationType.OTP_VERIFICATION,
                    generateOtpCommand.login(),
                    Map.of("otp", otpCode)
            ));
        }
    }
}
