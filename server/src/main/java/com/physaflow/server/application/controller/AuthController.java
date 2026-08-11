package com.physaflow.server.application.controller;



import com.physaflow.server.application.dto.auth.AuthenticationResponse;
import com.physaflow.server.application.dto.auth.RequestOtpRequest;
import com.physaflow.server.application.dto.auth.RequestOtpResponse;
import com.physaflow.server.application.dto.auth.VerifyOtpRequest;
import com.physaflow.server.domain.service.auth.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for email-based authentication")
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "Request verification code",
            description = "Generates and sends a verification code to the specified email address. "
                    + "If an assessment ID is provided, the assessment is associated with the corresponding lead."
    )
    @PostMapping("/request-otp")
    public ResponseEntity<RequestOtpResponse> requestOtp(
            @Valid @RequestBody RequestOtpRequest request
    ) {

        RequestOtpResponse response =
                authService.requestOtp(
                        request.email(),
                        request.assessmentId()
                );

        return ResponseEntity.ok(response);

    }

    @Operation(
            summary = "Verify authentication code",
            description = "Validates the verification code sent to the user's email. "
                    + "If the code is valid, the lead is activated when necessary and a JWT access token is returned."
    )
    @PostMapping("/verify-otp")
    public ResponseEntity<AuthenticationResponse> verifyOtp(
            @Valid @RequestBody VerifyOtpRequest request
    ) {

        AuthenticationResponse response =
                authService.verifyOtp(
                        request.email(),
                        request.code()
                );

        return ResponseEntity.ok(response);
    }
}