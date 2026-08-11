package com.physaflow.server.application.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record VerifyOtpRequest(
        @NotBlank(message = "Email is required.")
        @Email(message = "Email must be a valid email address")
        @Pattern(
                regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
                message = "Email must contain a valid domain"
        )
        String email,

        @NotBlank(message = "Verification code is required.")
        @Pattern(
                regexp = "\\d{6}",
                message = "Verification code must contain 6 digits."
        )
        String code
) {}
