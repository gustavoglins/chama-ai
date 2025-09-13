package com.chamaai.authservice.infrastructure.adapters.http.controller;

import com.chamaai.authservice.application.commands.GenerateOtpCommand;
import com.chamaai.authservice.application.commands.ValidateOtpCommand;
import com.chamaai.authservice.application.ports.in.GenerateOtpUseCase;
import com.chamaai.common.dto.ApiResponseDTO;
import com.chamaai.common.enums.ApiResponseStatus;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final GenerateOtpUseCase generateOtpUseCase;

    public AuthController(GenerateOtpUseCase generateOtpUseCase) {
        this.generateOtpUseCase = generateOtpUseCase;
    }

    @PostMapping("/otp/generate")
    public <T> ResponseEntity<ApiResponseDTO<T>> generateOtp(@RequestBody @Valid GenerateOtpCommand request) {
        this.generateOtpUseCase.generateOTP(request);
        ApiResponseDTO<T> response = new ApiResponseDTO<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "OTP sent successfully",
                null,
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/otp/validate")
    public ResponseEntity<ApiResponseDTO<?>> validateOtp(@RequestBody @Valid ValidateOtpCommand request) {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
