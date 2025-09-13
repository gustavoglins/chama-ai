package com.chamaai.userservice.infrastructure.adapters.http.controllers;

import com.chamaai.userservice.application.commands.CreateUserCommand;
import com.chamaai.userservice.application.commands.UpdateUserCommand;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.ApiResponse;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.ApiResponseStatus;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;
import com.chamaai.userservice.application.ports.in.CreateUserUseCase;
import com.chamaai.userservice.application.ports.in.UpdateUserUseCase;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final CreateUserUseCase createUserUseCase;
    private final UpdateUserUseCase updateUserUseCase;

    public UserController(CreateUserUseCase createUserUseCase, UpdateUserUseCase updateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>> createUser(@RequestBody @Valid CreateUserCommand request) {
        logger.info("Receive request to create a new user");
        UserResponseDTO result = this.createUserUseCase.createUser(request);
        ApiResponse<UserResponseDTO> response = new ApiResponse<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.CREATED.value(),
                "User created successfully",
                result,
                null
        );
        logger.info("Successfully created a new user");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUser(@RequestBody @Valid UpdateUserCommand request) {
        UserResponseDTO result = this.updateUserUseCase.updateUser(request);
        ApiResponse<UserResponseDTO> response = new ApiResponse<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "User updated successfully",
                result,
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
