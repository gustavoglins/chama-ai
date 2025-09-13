package com.chamaai.authservice.application.usecase;

import com.chamaai.authservice.application.dto.requests.GenerateOtpRequestDTO;
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
    public void generateOTP(GenerateOtpRequestDTO generateOtpRequestDTO) {
        int otpCode = ThreadLocalRandom.current().nextInt(100000, 999999);
        if (generateOtpRequestDTO.login().contains("@")) {
            this.notificationRestPort.sendEmailNotification(new SendNotificationRequestDTO<>(
                    NotificationType.LOGIN_VERIFICATION,
                    generateOtpRequestDTO.login(),
                    Map.of("otp", otpCode)
            ));
        } else {
            this.notificationRestPort.sendWhatsappNotification(new SendNotificationRequestDTO<>(
                    NotificationType.LOGIN_VERIFICATION,
                    generateOtpRequestDTO.login(),
                    Map.of("otp", otpCode)
            ));
        }
    }
}
