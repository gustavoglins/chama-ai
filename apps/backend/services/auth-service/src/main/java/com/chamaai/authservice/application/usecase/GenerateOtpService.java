package com.chamaai.authservice.application.usecase;

import com.chamaai.authservice.application.commands.GenerateOtpCommand;
import com.chamaai.authservice.application.ports.in.GenerateOtpUseCase;
import com.chamaai.authservice.application.ports.out.CachePort;
import com.chamaai.authservice.application.ports.out.NotificationRestPort;
import com.chamaai.common.dto.requests.SendNotificationRequestDTO;
import com.chamaai.common.enums.NotificationType;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class GenerateOtpService implements GenerateOtpUseCase {

    private static final String OTP_CACHE_KEY_PREFIX = "OTP:";
    private static final int OTP_EXPIRATION_TIME_IN_SECONDS = 900;

    private final NotificationRestPort notificationRestPort;
    private final CachePort cachePort;

    public GenerateOtpService(NotificationRestPort notificationRestPort, CachePort cachePort) {
        this.notificationRestPort = notificationRestPort;
        this.cachePort = cachePort;
    }

    @Override
    public void generateOTP(GenerateOtpCommand generateOtpCommand) {
        int otpCode = ThreadLocalRandom.current().nextInt(100000, 999999);
        cachePort.setItem(OTP_CACHE_KEY_PREFIX + generateOtpCommand.login(), String.valueOf(otpCode), OTP_EXPIRATION_TIME_IN_SECONDS);

        if (generateOtpCommand.login().contains("@")) {
            this.notificationRestPort.sendEmailNotification(new SendNotificationRequestDTO(
                    NotificationType.OTP_VERIFICATION,
                    generateOtpCommand.login(),
                    Map.of("otp", otpCode)
            ));
        } else {
            this.notificationRestPort.sendWhatsappNotification(new SendNotificationRequestDTO(
                    NotificationType.OTP_VERIFICATION,
                    generateOtpCommand.login(),
                    Map.of("otp", otpCode)
            ));
        }
    }
}
