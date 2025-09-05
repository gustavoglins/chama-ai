package com.chamaai.notificationservice.service.implementations;

import com.chamaai.notificationservice.clients.EvolutionApiClient;
import com.chamaai.notificationservice.dtos.requests.SendOtpEmailRequestDto;
import com.chamaai.notificationservice.dtos.requests.SendOtpPhoneRequestDto;
import com.chamaai.notificationservice.entity.Notification;
import com.chamaai.notificationservice.enums.NotificationChannel;
import com.chamaai.notificationservice.enums.NotificationStatus;
import com.chamaai.notificationservice.repository.NotificationRepository;
import com.chamaai.notificationservice.service.interfaces.NotificationService;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final String apiEmail;
    private final Resend resend;
    private final EvolutionApiClient evolutionApiClient;

    public NotificationServiceImpl(
            NotificationRepository notificationRepository,
            @Value("${api.email}") String apiEmail,
            Resend resend,
            EvolutionApiClient evolutionApiClient
    ) {
        this.notificationRepository = notificationRepository;
        this.apiEmail = apiEmail;
        this.resend = resend;
        this.evolutionApiClient = evolutionApiClient;
    }

    @Override
    public void sendOtpEmail(SendOtpEmailRequestDto request) {
        String template = loadTemplate("otp-template.html");
        String otpCode = request.otpCode();

        String htmlBody = template.replace("{{otpCode}}", otpCode);

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from(apiEmail)
                .to(request.recipient())
                .subject("Código de Acesso - OTP")
                .html(htmlBody)
                .build();

        try {
            resend.emails().send(params);
            String message = params.getSubject() + ": " + otpCode;
            notificationRepository.save(new Notification(request.recipient(), message, NotificationChannel.EMAIL, NotificationStatus.SENT));
        } catch (ResendException exception) {
            throw new RuntimeException(exception.getMessage(), exception.getCause());
        }
    }

    @Override
    public void sendOtpWhatsapp(SendOtpPhoneRequestDto request) {
        String message = "Seu código OTP é: " + request.otpCode();
        BigInteger recipient = new BigInteger("55" + request.recipient());
        evolutionApiClient.sendMessage(recipient, message);
        notificationRepository.save(new Notification(recipient.toString(), message, NotificationChannel.WHATSAPP, NotificationStatus.SENT));
    }

    private String loadTemplate(String fileName) {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("email-templates/" + fileName)) {
            if (inputStream == null) throw new RuntimeException("Template not found: '" + fileName + "'");
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException exception) {
            throw new RuntimeException(exception.getMessage(), exception.getCause());
        }
    }
}
