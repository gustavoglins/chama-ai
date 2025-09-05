package com.chamaai.notificationservice.controller;

import com.chamaai.notificationservice.dtos.requests.SendOtpEmailRequestDto;
import com.chamaai.notificationservice.dtos.requests.SendOtpPhoneRequestDto;
import com.chamaai.notificationservice.service.interfaces.NotificationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/email/send")
    public ResponseEntity<Void> sendEmail(@RequestBody @Valid SendOtpEmailRequestDto request) {
        notificationService.sendOtpEmail(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/whatsapp/send")
    public ResponseEntity<Void> sendWhatsApp(@RequestBody @Valid SendOtpPhoneRequestDto request) {
        notificationService.sendOtpWhatsapp(request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
