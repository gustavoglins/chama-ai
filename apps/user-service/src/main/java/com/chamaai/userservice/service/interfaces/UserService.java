package com.chamaai.userservice.service.interfaces;

import com.chamaai.userservice.dto.responses.UserDetailsResponseDTO;

import java.util.UUID;

public interface UserService {

    UserDetailsResponseDTO getById(UUID id);
}
