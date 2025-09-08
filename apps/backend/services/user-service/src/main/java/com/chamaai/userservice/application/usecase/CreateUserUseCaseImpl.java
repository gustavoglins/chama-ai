package com.chamaai.userservice.application.usecase;

import com.chamaai.userservice.application.dto.requests.CreateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;
import com.chamaai.userservice.application.exception.UserAlreadyExistsException;
import com.chamaai.userservice.application.mapper.UserMapper;
import com.chamaai.userservice.application.ports.in.CreateUserUseCase;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.repository.UserRepositoryPort;
import com.chamaai.userservice.domain.services.UserDomainService;
import org.springframework.stereotype.Service;

@Service
public class CreateUserUseCaseImpl implements CreateUserUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserDomainService userDomainService;
    private final UserMapper userMapper;

    public CreateUserUseCaseImpl(UserRepositoryPort userRepositoryPort, UserDomainService userDomainService, UserMapper userMapper) {
        this.userRepositoryPort = userRepositoryPort;
        this.userDomainService = userDomainService;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponseDTO createUser(CreateUserRequestDTO request) {
        if (userRepositoryPort.existsByEmailOrTaxId(request.email(), request.taxId())) {
            throw new UserAlreadyExistsException("User already exists with this email or tax ID.");
        }
        User user = userMapper.toDomain(request);
        userDomainService.validateUser(user);
        User savedUser = userRepositoryPort.save(user);
        return userMapper.toDTO(savedUser);
    }
}
