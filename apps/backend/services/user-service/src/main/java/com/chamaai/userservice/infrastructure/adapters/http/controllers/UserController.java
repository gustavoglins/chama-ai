package com.chamaai.userservice.infrastructure.adapters.http.controllers;

import com.chamaai.userservice.application.commands.CompleteRegistrationCommand;
import com.chamaai.userservice.application.commands.StartRegistrationCommand;
import com.chamaai.userservice.application.commands.UpdateUserCommand;
import com.chamaai.userservice.application.ports.in.CheckEmailUseCase;
import com.chamaai.userservice.application.ports.in.CompleteRegistrationUseCase;
import com.chamaai.userservice.application.ports.in.StartRegistrationUseCase;
import com.chamaai.userservice.application.ports.in.UpdateUserUseCase;
import com.chamaai.userservice.infrastructure.adapters.http.dto.requests.CheckEmailRequestDTO;
import com.chamaai.userservice.infrastructure.adapters.http.dto.requests.CompleteRegistrationRequestDTO;
import com.chamaai.userservice.infrastructure.adapters.http.dto.requests.StartRegistrationRequestDTO;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.ApiResponse;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.ApiResponseStatus;
import com.chamaai.userservice.infrastructure.adapters.http.dto.responses.UserResponseDTO;
import com.chamaai.userservice.infrastructure.adapters.persistence.entity.UserEntity;
import com.chamaai.userservice.infrastructure.adapters.persistence.repository.SpringDataUserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final StartRegistrationUseCase startRegistrationUseCase;
    private final UpdateUserUseCase updateUserUseCase;
    private final CompleteRegistrationUseCase completeRegistrationUseCase;
    private final CheckEmailUseCase checkEmailUseCase;

    //TODO: remove this
    @Autowired
    private SpringDataUserRepository userRepository;


    public UserController(CheckEmailUseCase checkEmailUseCase, CompleteRegistrationUseCase completeRegistrationUseCase, UpdateUserUseCase updateUserUseCase, StartRegistrationUseCase startRegistrationUseCase) {
        this.checkEmailUseCase = checkEmailUseCase;
        this.completeRegistrationUseCase = completeRegistrationUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.startRegistrationUseCase = startRegistrationUseCase;
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<ApiResponse<Map<String, String>>> checkEmail(@RequestBody @Valid CheckEmailRequestDTO request) {
        boolean exists = this.checkEmailUseCase.checkEmail(request.email());
        Map<String, String> data = new HashMap<>();
        data.put("exists", String.valueOf(exists));
        ApiResponse<Map<String, String>> response = new ApiResponse<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "Check email completed successfully",
                data,
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/startSignup")
    public ResponseEntity<ApiResponse<Void>> startRegistration(@RequestBody @Valid StartRegistrationRequestDTO request) {
        this.startRegistrationUseCase.startRegistration(new StartRegistrationCommand(request.email()));
        ApiResponse<Void> response = new ApiResponse<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "Registration started and OTP has been sent successfully",
                null,
                null
        );
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/completeSignup")
    public ResponseEntity<ApiResponse<UserResponseDTO>> completeRegistration(@RequestBody @Valid CompleteRegistrationRequestDTO request) {
        UserResponseDTO user = this.completeRegistrationUseCase.completeRegistration(new CompleteRegistrationCommand(request));
        ApiResponse<UserResponseDTO> response = new ApiResponse<>(
                ApiResponseStatus.SUCCESS,
                HttpStatus.OK.value(),
                "Registration completed successfully",
                user,
                null
        );
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

    @GetMapping("/all")
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
