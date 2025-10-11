package com.chamaai.userservice.application.usecase;

import com.chamaai.userservice.application.ports.in.CheckEmailUseCase;
import com.chamaai.userservice.application.ports.out.UserRepositoryPort;
import org.springframework.stereotype.Service;

@Service
public class CheckEmailService implements CheckEmailUseCase {

    private final UserRepositoryPort userRepositoryPort;

    public CheckEmailService(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    public boolean checkEmail(String email) {
        return userRepositoryPort.existsByEmail(email);
    }
}
