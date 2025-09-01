package com.chamaai.userservice.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequestDTO(
        @NotBlank(message = "Token is required.")
        String token,

        @NotBlank(message = "New password is required.")
        String newPassword
) {
}
