package com.chamaai.userservice.service.interfaces;

import com.chamaai.userservice.dto.requests.*;
import com.chamaai.userservice.dto.responses.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO signup(ClientSignupRequestDto data);

    AuthResponseDTO signup(ServiceProviderSignupRequestDTO data);

    AuthResponseDTO login(LoginRequestDTO loginRequestDto);

    void sendOtp(SendOtpRequestDto sendOtpRequestDto);

    AuthResponseDTO verifyOtp(VerifyOtpRequestDTO verifyOtpRequestDTO);

    void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDto);
}
