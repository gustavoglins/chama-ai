package com.chamaai.userservice.application.usecase;

import com.chamaai.common.dto.SendNotificationRequestDTO;
import com.chamaai.common.enums.NotificationType;
import com.chamaai.userservice.application.dto.requests.CreateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;
import com.chamaai.userservice.application.exception.DataAlreadyRegisteredException;
import com.chamaai.userservice.application.mapper.UserMapper;
import com.chamaai.userservice.application.ports.in.CreateUserUseCase;
import com.chamaai.userservice.application.ports.out.NotificationPort;
import com.chamaai.userservice.application.ports.out.PasswordEncoderPort;
import com.chamaai.userservice.application.ports.out.UserRepositoryPort;
import com.chamaai.userservice.application.ports.out.UserValidationPort;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.services.UserDomainService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CreateUserUseCaseImpl implements CreateUserUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserDomainService userDomainService;
    private final PasswordEncoderPort passwordEncoderPort;
    private final NotificationPort notificationPort;
    private final UserValidationPort userValidationPort;
    private final UserMapper userMapper;

    public CreateUserUseCaseImpl(
            UserRepositoryPort userRepositoryPort,
            UserDomainService userDomainService,
            PasswordEncoderPort passwordEncoderPort,
            @Qualifier("kafkaNotificationAdapter") NotificationPort notificationPort,
            UserValidationPort userValidationPort,
            UserMapper userMapper
    ) {
        this.userRepositoryPort = userRepositoryPort;
        this.userDomainService = userDomainService;
        this.passwordEncoderPort = passwordEncoderPort;
        this.notificationPort = notificationPort;
        this.userValidationPort = userValidationPort;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponseDTO createUser(CreateUserRequestDTO request) {
        List<String> conflicts = userValidationPort.validateUniqueFields(request.taxId(), request.email(), request.phoneNumber());
        if (!conflicts.isEmpty()) {
            throw new DataAlreadyRegisteredException(conflicts);
        }

        User user = userMapper.toDomain(request);
        user.updatePassword(passwordEncoderPort.encode(user.getPasswordHash()));
        userDomainService.validateUser(user);

        User savedUser = userRepositoryPort.save(user);
        notificationPort.sendEmailNotification(new SendNotificationRequestDTO<>(
                NotificationType.WELCOME,
                savedUser.getEmail(),
                Map.of("name", savedUser.getFirstName())
        ));

        return userMapper.toDTO(savedUser);
    }
}
