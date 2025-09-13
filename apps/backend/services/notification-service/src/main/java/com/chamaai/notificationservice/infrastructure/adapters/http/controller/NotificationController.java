package com.chamaai.notificationservice.infrastructure.adapters.http.controller;

import com.chamaai.common.dto.ApiResponseDTO;
import com.chamaai.common.enums.ApiResponseStatus;
import com.chamaai.common.enums.NotificationChannel;
import com.chamaai.notificationservice.application.commands.NotificationCommand;
import com.chamaai.notificationservice.application.ports.in.NotificationOrchestratorUseCase;
import com.chamaai.notificationservice.infrastructure.adapters.http.dto.requests.SendEmailRequestDTO;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final Logger logger = LoggerFactory.getLogger(NotificationController.class);
    private final NotificationOrchestratorUseCase notificationOrchestratorUseCase;

    public NotificationController(NotificationOrchestratorUseCase notificationOrchestratorUseCase) {
        this.notificationOrchestratorUseCase = notificationOrchestratorUseCase;
    }

    @PostMapping("/email/send")
    public ResponseEntity<ApiResponseDTO<Void>> sendEmail(@RequestBody @Valid SendEmailRequestDTO request) {
        logger.info("Receive request to send email");
        this.notificationOrchestratorUseCase.send(new NotificationCommand(
                NotificationChannel.EMAIL,
                request.type(),
                request.email(),
                request.data()
        ));
        ApiResponseDTO<Void> response = new ApiResponseDTO<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "OTP Code sent successfully",
                null,
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

//    @PostMapping("/whatsapp/send")
//    public ResponseEntity<ApiResponseDTO<?>> sendWhatsapp(@RequestBody @Valid Send request) {
//        return ResponseEntity.status(HttpStatus.OK).body(null);
//    }
}
