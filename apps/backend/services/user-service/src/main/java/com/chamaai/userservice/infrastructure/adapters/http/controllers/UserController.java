package com.chamaai.userservice.infrastructure.adapters.http.controllers;

import com.chamaai.userservice.application.dto.requests.CreateUserRequestDTO;
import com.chamaai.userservice.application.dto.requests.UpdateUserRequestDTO;
import com.chamaai.userservice.application.dto.responses.ApiResponse;
import com.chamaai.userservice.application.dto.responses.ApiResponseStatus;
import com.chamaai.userservice.application.dto.responses.UserResponseDTO;
import com.chamaai.userservice.application.ports.in.CreateUserUseCase;
import com.chamaai.userservice.application.ports.in.UpdateUserUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final CreateUserUseCase createUserUseCase;
    private final UpdateUserUseCase updateUserUseCase;

    public UserController(CreateUserUseCase createUserUseCase, UpdateUserUseCase updateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>> createUser(@RequestBody @Valid CreateUserRequestDTO request) {
        System.out.println("Request received");
        UserResponseDTO result = this.createUserUseCase.createUser(request);
        ApiResponse<UserResponseDTO> response = new ApiResponse<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.CREATED.value(),
                "User created successfully",
                result,
                null
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUser(@RequestBody @Valid UpdateUserRequestDTO request) {
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
