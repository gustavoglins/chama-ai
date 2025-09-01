package com.chamaai.userservice.controller;

import com.chamaai.userservice.dto.requests.LoginRequestDTO;
import com.chamaai.userservice.dto.requests.ResetPasswordRequestDTO;
import com.chamaai.userservice.dto.requests.SignupRequestDTO;
import com.chamaai.userservice.dto.responses.AuthResponseDTO;
import com.chamaai.userservice.service.AuthService;
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

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponseDTO> signup(@RequestBody @Valid SignupRequestDTO signupRequestDto) {
        AuthResponseDTO authResponseDTO = authService.signup(signupRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDto) {
        AuthResponseDTO authResponseDTO = authService.login(loginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(authResponseDTO);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody @Valid ResetPasswordRequestDTO resetPasswordRequestDto) {
        authService.resetPassword(resetPasswordRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
