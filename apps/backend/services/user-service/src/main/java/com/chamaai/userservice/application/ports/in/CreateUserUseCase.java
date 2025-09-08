package com.chamaai.userservice.application.ports.in;

import com.chamaai.userservice.application.dto.requests.CreateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;

public interface CreateUserUseCase {
    UserResponseDTO createUser(CreateUserRequestDTO signupRequestDTO);
}