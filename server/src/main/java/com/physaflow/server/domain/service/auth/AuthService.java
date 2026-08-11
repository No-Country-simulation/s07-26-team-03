package com.physaflow.server.domain.service.auth;


import com.physaflow.server.application.dto.auth.AuthenticationResponse;
import com.physaflow.server.application.exception.business.auth.InvalidCredentialsException;
import com.physaflow.server.application.exception.http.BadRequestException;
import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.domain.model.OtpCode;
import com.physaflow.server.domain.model.enums.LeadStatus;
import com.physaflow.server.domain.model.enums.OtpPurpose;
import com.physaflow.server.domain.service.AssessmentService;
import com.physaflow.server.domain.service.email.EmailService;
import com.physaflow.server.infrastructure.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AssessmentService assessmentService;
    private final LeadRepository leadRepository;
    private final OtpService otpService;
    private final EmailService emailService;
    private final JwtService jwtService;

    /**
     * Solicita un código OTP para autenticación.
     *
     * <p>
     * Si assessmentId es proporcionado, el Assessment se asocia
     * al Lead durante este proceso.
     * </p>
     *
     * @param email email del usuario
     * @param "assessmentId" Assessment opcional que se desea desbloquear
     */

    public void requestOtp( String email, UUID assessmentId) {

        String normalizedEmail = normalizeEmail(email);
        log.info("Requesting OTP for email: {}", normalizedEmail);

        Lead lead = leadRepository
                .findByEmailIgnoreCase(normalizedEmail)
                .orElseGet(() ->
                        createLead(normalizedEmail)
                );

        if (assessmentId != null) {

            assessmentService.associateWithLead(
                    assessmentId,
                    lead
            );
        }

        OtpPurpose purpose =
                getOtpPurpose(lead);

        String code =
                otpService.generateOtp();

        otpService.createOtp(
                lead,
                code,
                purpose
        );

        emailService.sendOtp(
                lead.getEmail(),
                code,
                purpose
        );
    }

    public AuthenticationResponse verifyOtp(
            String email,
            String code
    ) {

        String normalizedEmail =
                normalizeEmail(email);

        Lead lead = leadRepository
                .findByEmailIgnoreCase(normalizedEmail)
                .orElseThrow(
                        InvalidCredentialsException::new
                );

        OtpPurpose purpose =
                getOtpPurpose(lead);

        OtpCode otp =
                otpService.findLatestOtp(
                        lead,
                        purpose
                );

        otpService.verifyOtp(
                otp,
                code
        );

        otpService.markAsUsed(otp);

        activateLeadIfNecessary(lead);

        String token =
                jwtService.generateToken(lead);

        return new AuthenticationResponse(
                token,
                "Bearer",
                jwtService.getExpirationSeconds()
        );
    }

    private Lead createLead(String email) {

        LocalDateTime now =
                LocalDateTime.now();

        Lead lead = Lead.builder()
                .email(email)
                .emailVerified(false)
                .status(LeadStatus.PENDING)
                .createdAt(now)
                .updatedAt(now)
                .build();

        return leadRepository.save(lead);
    }

    private OtpPurpose getOtpPurpose(Lead lead) {

        return lead.isEmailVerified()
                ? OtpPurpose.LOGIN
                : OtpPurpose.ACTIVATION;
    }

    private void activateLeadIfNecessary(
            Lead lead
    ) {

        if (!lead.isEmailVerified()) {

            lead.setEmailVerified(true);
            lead.setStatus(LeadStatus.ACTIVE);
        }

        lead.setUpdatedAt(
                LocalDateTime.now()
        );

        leadRepository.save(lead);
    }

    private String normalizeEmail(
            String email
    ) {

        return email
                .trim()
                .toLowerCase();
    }
}