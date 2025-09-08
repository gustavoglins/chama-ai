package com.chamaai.userservice.application.ports.in;

import com.chamaai.userservice.application.dto.requests.UpdateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;

public interface UpdateUserUseCase {
    UserResponseDTO updateUser(UpdateUserRequestDTO updateUserRequestDTO);
}
