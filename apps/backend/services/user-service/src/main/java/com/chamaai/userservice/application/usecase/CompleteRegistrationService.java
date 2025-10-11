package com.chamaai.userservice.application.usecase;

import com.chamaai.common.dto.responses.UserCreatedEvent;
import com.chamaai.userservice.application.commands.CompleteRegistrationCommand;
import com.chamaai.userservice.application.exception.DataAlreadyRegisteredException;
import com.chamaai.userservice.application.mapper.UserMapper;
import com.chamaai.userservice.application.ports.in.CompleteRegistrationUseCase;
import com.chamaai.userservice.application.ports.out.DomainEventPublisherPort;
import com.chamaai.userservice.application.ports.out.PasswordEncoderPort;
import com.chamaai.userservice.application.ports.out.UserRepositoryPort;
import com.chamaai.userservice.application.ports.out.UserValidationPort;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.services.UserDomainService;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompleteRegistrationService implements CompleteRegistrationUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserDomainService userDomainService;
    private final PasswordEncoderPort passwordEncoderPort;
    private final UserValidationPort userValidationPort;
    private final DomainEventPublisherPort domainEventPublisherPort;
    private final UserMapper userMapper;

    public CompleteRegistrationService(UserRepositoryPort userRepositoryPort, UserDomainService userDomainService, PasswordEncoderPort passwordEncoderPort, UserValidationPort userValidationPort, DomainEventPublisherPort domainEventPublisherPort, UserMapper userMapper) {
        this.userRepositoryPort = userRepositoryPort;
        this.userDomainService = userDomainService;
        this.passwordEncoderPort = passwordEncoderPort;
        this.userValidationPort = userValidationPort;
        this.domainEventPublisherPort = domainEventPublisherPort;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponseDTO completeRegistration(CompleteRegistrationCommand command) {
        List<String> conflicts = userValidationPort.validateUniqueFields(command.taxId(), command.email());
        if (!conflicts.isEmpty()) {
            throw new DataAlreadyRegisteredException(conflicts);
        }

        User user = userMapper.toDomain(command);
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
