package com.physaflow.server.application.controller;



import com.physaflow.server.application.dto.auth.AuthenticationResponse;
import com.physaflow.server.application.dto.auth.RequestOtpRequest;
import com.physaflow.server.application.dto.auth.VerifyOtpRequest;
import com.physaflow.server.domain.service.auth.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Login", description = "Endpoints para Registrar email, verificar codigo OTP y enviar por email codigo otp.")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/request-otp")
    public ResponseEntity<Void> requestOtp(
            @Valid @RequestBody RequestOtpRequest request
    ) {

        authService.requestOtp(
                request.email(),
                request.assessmentId()
        );

        return ResponseEntity.ok().build();
    }

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