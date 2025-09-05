package com.chamaai.userservice.service.implementations;

import com.chamaai.userservice.dto.responses.UserDetailsResponseDTO;
import com.chamaai.userservice.repository.UserRepository;
import com.chamaai.userservice.service.interfaces.UserService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetailsResponseDTO getById(UUID id) {
        return null;
    }
}
