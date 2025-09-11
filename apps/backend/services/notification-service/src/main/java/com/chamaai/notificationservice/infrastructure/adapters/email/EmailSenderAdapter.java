package com.chamaai.notificationservice.infrastructure.adapters.email;

import com.chamaai.common.dto.UserCreatedEvent;
import com.chamaai.notificationservice.application.ports.out.EmailSenderPort;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Component
public class EmailSenderAdapter implements EmailSenderPort {

    private final String apiEmail;
    private final Resend resend;

    public EmailSenderAdapter(@Value("${api.email}") String apiEmail, Resend resend) {
        this.apiEmail = apiEmail;
        this.resend = resend;
    }

    @Override
    public void sendWelcomeEmail(UserCreatedEvent data) {
        String template = loadTemplate("welcome-email.html");
        String htmlBody = template.replace("{{userFirstName}}", data.name());

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from(this.apiEmail)
                .to(data.email())
                .subject("Boas Vindas - Chama Ai")
                .html(htmlBody)
                .build();

        try {
            resend.emails().send(params);
            String message = params.getSubject() + ": " + params.getTo();
            //TODO: persistence to db
        } catch (ResendException exception) {
            throw new RuntimeException(exception.getMessage(), exception.getCause());
        }
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
