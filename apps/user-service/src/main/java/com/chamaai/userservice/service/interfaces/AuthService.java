package com.chamaai.userservice.service.implementations;

import com.chamaai.userservice.dto.requests.LoginRequestDTO;
import com.chamaai.userservice.dto.requests.ResetPasswordRequestDTO;
import com.chamaai.userservice.dto.requests.SignupRequestDTO;
import com.chamaai.userservice.dto.responses.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO signup(SignupRequestDTO signupRequestDto);
    AuthResponseDTO login(LoginRequestDTO loginRequestDto);
    void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDto);
}
