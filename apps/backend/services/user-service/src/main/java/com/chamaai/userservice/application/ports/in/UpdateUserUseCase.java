package com.chamaai.userservice.application.ports.in;

import com.chamaai.userservice.application.commands.UpdateUserCommand;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;

public interface UpdateUserUseCase {
    UserResponseDTO updateUser(UpdateUserCommand updateUserCommand);
}
