package com.chamaai.userservice.application.ports.in;

import com.chamaai.userservice.application.commands.CompleteRegistrationCommand;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;

public interface CompleteRegistrationUseCase {

    UserResponseDTO completeRegistration(CompleteRegistrationCommand command);
}
