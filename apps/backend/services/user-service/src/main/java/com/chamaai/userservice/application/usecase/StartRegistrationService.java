package com.chamaai.userservice.application.usecase;

import com.chamaai.common.dto.responses.ApiResponseDTO;
import com.chamaai.common.enums.ApiResponseStatus;
import com.chamaai.userservice.application.commands.StartRegistrationCommand;
import com.chamaai.userservice.application.exception.DataAlreadyRegisteredException;
import com.chamaai.userservice.application.ports.in.StartRegistrationUseCase;
import com.chamaai.userservice.application.ports.out.AuthRestPort;
import com.chamaai.userservice.application.ports.out.UserRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StartRegistrationService implements StartRegistrationUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final AuthRestPort authRestPort;

    public StartRegistrationService(UserRepositoryPort userRepositoryPort, AuthRestPort authRestPort) {
        this.userRepositoryPort = userRepositoryPort;
        this.authRestPort = authRestPort;
    }

    @Override
    public void startRegistration(StartRegistrationCommand command) {
        if (command.login().contains("@")) {
            if (userRepositoryPort.existsByEmail(command.login())) {
                throw new DataAlreadyRegisteredException(List.of("Email already in use"));
            }
            ApiResponseDTO<?> result = this.authRestPort.generateOtp(command.login());
            if (result.status() == ApiResponseStatus.ERROR)
                throw new RuntimeException("Failed to generate OTP");
        } else {
            if (userRepositoryPort.existsByPhoneNumber(command.login())) {
                throw new DataAlreadyRegisteredException(List.of("Phone number already registered"));
            }
            ApiResponseDTO<?> result = this.authRestPort.generateOtp(command.login());
            if (result.status() == ApiResponseStatus.ERROR)
                throw new RuntimeException("Failed to generate OTP");
        }
    }
}
