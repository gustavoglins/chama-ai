package com.chamaai.userservice.controllers;

import com.chamaai.userservice.dto.requests.*;
import com.chamaai.userservice.dto.responses.AuthResponseDTO;
import com.chamaai.userservice.dto.responses.SendCodeResponseDTO;
import com.chamaai.userservice.service.interfaces.AuthService;
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
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup/client")
    public ResponseEntity<AuthResponseDTO> signup(@RequestBody @Valid ClientSignupRequestDto request) {
        logger.info("Received Client signup request: {}", request);
        AuthResponseDTO authResponseDTO = authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponseDTO);
    }

    @PostMapping("/signup/service-provider")
    public ResponseEntity<AuthResponseDTO> signup(@RequestBody @Valid ServiceProviderSignupRequestDTO request) {
        logger.info("Received Service Provider signup request: {}", request);
        AuthResponseDTO authResponseDTO = authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO request) {
        AuthResponseDTO authResponseDTO = authService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(authResponseDTO);
    }

    @PostMapping("/otp/send")
    public ResponseEntity<SendCodeResponseDTO> sendOtp(@RequestBody @Valid SendOtpRequestDto sendOtpRequestDto) {
        logger.info("Received OTP send request: {}", sendOtpRequestDto);
        authService.sendOtp(sendOtpRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(new SendCodeResponseDTO("OK", "OTP sent successfully", 600));
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<AuthResponseDTO> verifyOtp(@RequestBody @Valid VerifyOtpRequestDTO verifyOtpRequestDTO) {
        logger.info("Received OTP verify request: {}", verifyOtpRequestDTO);
        AuthResponseDTO response = authService.verifyOtp(verifyOtpRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody @Valid ResetPasswordRequestDTO resetPasswordRequestDto) {
        authService.resetPassword(resetPasswordRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
