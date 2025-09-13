package com.chamaai.notificationservice.application.commands.out;

import com.chamaai.notificationservice.domain.enums.EmailTemplate;

public record SendEmailCommand(
        EmailTemplate template,
        String recipient,
        String subject,
        String dynamicVariableValue
) {
}
