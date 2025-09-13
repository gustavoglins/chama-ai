package com.chamaai.notificationservice.application.ports.out;

import com.chamaai.notificationservice.domain.enums.EmailTemplate;

public interface EmailSenderPort {
    void send(EmailTemplate template, String recipient, String subject, String dynamicVariableValue);
}
