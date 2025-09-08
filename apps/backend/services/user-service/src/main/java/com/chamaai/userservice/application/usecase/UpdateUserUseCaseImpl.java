package com.chamaai.userservice.application.usecase;

import com.chamaai.userservice.application.dto.requests.UpdateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;
import com.chamaai.userservice.application.mapper.UserMapper;
import com.chamaai.userservice.application.ports.in.UpdateUserUseCase;
import com.chamaai.userservice.domain.model.User;
import com.chamaai.userservice.domain.repository.UserRepositoryPort;
import com.chamaai.userservice.domain.services.UserDomainService;
import org.springframework.stereotype.Service;

@Service
public class UpdateUserUseCaseImpl implements UpdateUserUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final UserDomainService userDomainService;
    private final UserMapper userMapper;

    public UpdateUserUseCaseImpl(UserRepositoryPort userRepositoryPort, UserDomainService userDomainService, UserMapper userMapper) {
        this.userRepositoryPort = userRepositoryPort;
        this.userDomainService = userDomainService;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponseDTO updateUser(UpdateUserRequestDTO updateUserRequestDTO) {
        User user = userRepositoryPort.findById(updateUserRequestDTO.id()).orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (updateUserRequestDTO.email() != null && !updateUserRequestDTO.email().equals(user.getEmail()) &&
                userRepositoryPort.existsByEmail(updateUserRequestDTO.email())) {
            throw new IllegalArgumentException("Email already in use");
        }

        if (updateUserRequestDTO.phoneNumber() != null && !updateUserRequestDTO.phoneNumber().equals(user.getPhoneNumber()) && userRepositoryPort.existsByPhoneNumber(updateUserRequestDTO.phoneNumber())) {
            throw new IllegalArgumentException("Phone number already in use");
        }

        userDomainService.updateEmail(user, updateUserRequestDTO.email());
        userDomainService.updatePhoneNumber(user, updateUserRequestDTO.phoneNumber());
        if (updateUserRequestDTO.firstName() != null) user.updateFirstName(updateUserRequestDTO.firstName());
        if (updateUserRequestDTO.lastName() != null) user.updateLastName(updateUserRequestDTO.lastName());
        if (updateUserRequestDTO.profilePicture() != null)
            user.updateProfilePicture(updateUserRequestDTO.profilePicture());
        if (updateUserRequestDTO.bio() != null) user.updateBio(updateUserRequestDTO.bio());

        userDomainService.validateUser(user);

        userRepositoryPort.save(user);

        return userMapper.toDTO(user);
    }
}
