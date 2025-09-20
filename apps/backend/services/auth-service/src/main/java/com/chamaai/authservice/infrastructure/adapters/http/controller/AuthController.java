package com.chamaai.authservice.infrastructure.adapters.http.controller;

import com.chamaai.authservice.application.commands.GenerateOtpCommand;
import com.chamaai.authservice.application.commands.ValidateOtpCommand;
import com.chamaai.authservice.application.ports.in.GenerateOtpUseCase;
import com.chamaai.authservice.application.ports.in.ValidateOtpUseCase;
import com.chamaai.authservice.application.ports.out.CachePort;
import com.chamaai.authservice.infrastructure.adapters.http.dto.requests.GenerateOtpRequestDTO;
import com.chamaai.authservice.infrastructure.adapters.http.dto.requests.ValidateOtpRequestDTO;
import com.chamaai.authservice.infrastructure.adapters.http.dto.responses.AuthTokenResponseDTO;
import com.chamaai.common.dto.responses.ApiResponseDTO;
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
    private final ValidateOtpUseCase validateOtpUseCase;
    private final CachePort cachePort;

    public AuthController(GenerateOtpUseCase generateOtpUseCase, ValidateOtpUseCase validateOtpUseCase, CachePort cachePort) {
        this.generateOtpUseCase = generateOtpUseCase;
        this.validateOtpUseCase = validateOtpUseCase;
        this.cachePort = cachePort;
    }

    @PostMapping("/otp/generate")
    public ResponseEntity<ApiResponseDTO<Void>> generateOtp(@RequestBody @Valid GenerateOtpRequestDTO request) {
        this.cachePort.deleteItem(request.login());
        this.generateOtpUseCase.generateOTP(new GenerateOtpCommand(request.login()));
        ApiResponseDTO<Void> response = new ApiResponseDTO<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "OTP sent successfully",
                null,
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/otp/validate")
    public ResponseEntity<ApiResponseDTO<AuthTokenResponseDTO>> validateOtp(@RequestBody @Valid ValidateOtpRequestDTO request) {
        String result = this.validateOtpUseCase.validate(new ValidateOtpCommand(request.login(), request.otp()));
        ApiResponseDTO<AuthTokenResponseDTO> response = new ApiResponseDTO<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "OTP validated successfully",
                new AuthTokenResponseDTO(result),
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
