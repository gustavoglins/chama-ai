package com.chamaai.userservice.application.ports.in;

import com.chamaai.userservice.application.commands.CreateUserCommand;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;

public interface CreateUserUseCase {
    UserResponseDTO createUser(CreateUserCommand command);
}