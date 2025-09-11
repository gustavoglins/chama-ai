package com.chamaai.userservice.application.usecase;

import com.chamaai.common.dto.UserCreatedEvent;
import com.chamaai.userservice.application.dto.requests.CreateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;
import com.chamaai.userservice.application.exception.DataAlreadyRegisteredException;
import com.chamaai.userservice.application.mapper.UserMapper;
import com.chamaai.userservice.application.ports.in.CreateUserUseCase;
import com.chamaai.userservice.application.ports.out.DomainEventPublisherPort;
import com.chamaai.userservice.application.ports.out.PasswordEncoderPort;
import com.chamaai.userservice.application.ports.out.UserRepositoryPort;
import com.chamaai.userservice.application.ports.out.UserValidationPort;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.services.UserDomainService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreateUserUseCaseImpl implements CreateUserUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserDomainService userDomainService;
    private final PasswordEncoderPort passwordEncoderPort;
    private final UserValidationPort userValidationPort;
    private final DomainEventPublisherPort domainEventPublisherPort;
    private final UserMapper userMapper;

    public CreateUserUseCaseImpl(
            UserRepositoryPort userRepositoryPort,
            UserDomainService userDomainService,
            PasswordEncoderPort passwordEncoderPort,
            UserValidationPort userValidationPort,
            UserMapper userMapper,
            DomainEventPublisherPort domainEventPublisherPort
    ) {
        this.userRepositoryPort = userRepositoryPort;
        this.userDomainService = userDomainService;
        this.passwordEncoderPort = passwordEncoderPort;
        this.userValidationPort = userValidationPort;
        this.userMapper = userMapper;
        this.domainEventPublisherPort = domainEventPublisherPort;
    }

    @Override
    public UserResponseDTO createUser(CreateUserRequestDTO request) {
        userRepositoryPort.deleteAll(); //!TODO: remove this after all tests
        List<String> conflicts = userValidationPort.validateUniqueFields(request.taxId(), request.email(), request.phoneNumber());
        if (!conflicts.isEmpty()) {
            throw new DataAlreadyRegisteredException(conflicts);
        }

        User user = userMapper.toDomain(request);
        user.updatePassword(passwordEncoderPort.encode(user.getPasswordHash()));
        userDomainService.validateUser(user);

        User savedUser = userRepositoryPort.save(user);
        domainEventPublisherPort.publishUserCreatedEvent(new UserCreatedEvent(
                savedUser.getTaxId(),
                savedUser.getEmail(),
                savedUser.getFirstName()
        ));

        return userMapper.toDTO(savedUser);
    }
}
