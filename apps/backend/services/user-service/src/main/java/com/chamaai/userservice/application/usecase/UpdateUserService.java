package com.chamaai.userservice.application.usecase;

import com.chamaai.userservice.application.commands.UpdateUserCommand;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;
import com.chamaai.userservice.application.mapper.UserMapper;
import com.chamaai.userservice.application.ports.in.UpdateUserUseCase;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.application.ports.out.UserRepositoryPort;
import com.chamaai.userservice.domain.services.UserDomainService;
import org.springframework.stereotype.Service;

@Service
public class UpdateUserService implements UpdateUserUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserDomainService userDomainService;
    private final UserMapper userMapper;

    public UpdateUserService(UserRepositoryPort userRepositoryPort, UserDomainService userDomainService, UserMapper userMapper) {
        this.userRepositoryPort = userRepositoryPort;
        this.userDomainService = userDomainService;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponseDTO updateUser(UpdateUserCommand updateUserCommand) {
        User user = userRepositoryPort.findById(updateUserCommand.id()).orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (updateUserCommand.email() != null && !updateUserCommand.email().equals(user.getEmail()) &&
                userRepositoryPort.existsByEmail(updateUserCommand.email())) {
            throw new IllegalArgumentException("Email already in use");
        }

        if (updateUserCommand.phoneNumber() != null && !updateUserCommand.phoneNumber().equals(user.getPhoneNumber()) && userRepositoryPort.existsByPhoneNumber(updateUserCommand.phoneNumber())) {
            throw new IllegalArgumentException("Phone number already in use");
        }

        userDomainService.updateEmail(user, updateUserCommand.email());
        userDomainService.updatePhoneNumber(user, updateUserCommand.phoneNumber());
        if (updateUserCommand.firstName() != null) user.updateFirstName(updateUserCommand.firstName());
        if (updateUserCommand.lastName() != null) user.updateLastName(updateUserCommand.lastName());
        if (updateUserCommand.profilePicture() != null)
            user.updateProfilePicture(updateUserCommand.profilePicture());
        if (updateUserCommand.bio() != null) user.updateBio(updateUserCommand.bio());

        userDomainService.validateUser(user);

        userRepositoryPort.save(user);

        return userMapper.toDTO(user);
    }
}
