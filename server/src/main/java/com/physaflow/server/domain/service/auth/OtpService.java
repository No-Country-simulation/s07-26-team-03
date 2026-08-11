package com.physaflow.server.domain.service.auth;

import com.physaflow.server.application.exception.business.otp.OtpExpiredException;
import com.physaflow.server.application.exception.business.otp.OtpInvalidException;
import com.physaflow.server.application.exception.business.otp.OtpRateLimitExceededException;
import com.physaflow.server.domain.model.Lead;
import com.physaflow.server.domain.model.OtpCode;
import com.physaflow.server.domain.model.enums.OtpPurpose;
import com.physaflow.server.infrastructure.repository.OtpCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class OtpService {

    private static final int OTP_LENGTH = 6;
    private static final int MAX_ATTEMPTS = 5;
    private static final int OTP_EXPIRATION_MINUTES = 10;

    private final OtpCodeRepository otpCodeRepository;
    private final PasswordEncoder passwordEncoder;

    private final SecureRandom secureRandom = new SecureRandom();

    public String generateOtp() {

        int upperBound = (int) Math.pow(10, OTP_LENGTH);

        int otp = secureRandom.nextInt(upperBound);

        return String.format(
                "%0" + OTP_LENGTH + "d",
                otp
        );
    }

    public OtpCode createOtp(
            Lead lead,
            String code,
            OtpPurpose purpose
    ) {

        invalidateActiveOtps(lead, purpose);

        String codeHash =
                passwordEncoder.encode(code);

        LocalDateTime now = LocalDateTime.now();

        OtpCode otpCode = OtpCode.builder()
                .lead(lead)
                .codeHash(codeHash)
                .purpose(purpose)
                .expiresAt(
                        now.plusMinutes(OTP_EXPIRATION_MINUTES)
                )
                .usedAt(null)
                .attempts(0)
                .createdAt(now)
                .build();

        return otpCodeRepository.save(otpCode);
    }

    private void invalidateActiveOtps(
            Lead lead,
            OtpPurpose purpose
    ) {

        otpCodeRepository
                .findTopByLeadAndPurposeAndUsedAtIsNullOrderByCreatedAtDesc(
                        lead,
                        purpose
                )
                .ifPresent(otp -> {
                    otp.setUsedAt(LocalDateTime.now());
                    otpCodeRepository.save(otp);
                });
    }

    public OtpCode findLatestOtp(
            Lead lead,
            OtpPurpose purpose
    ) {

        return otpCodeRepository
                .findTopByLeadAndPurposeAndUsedAtIsNullOrderByCreatedAtDesc(
                        lead,
                        purpose
                )
                .orElseThrow(OtpInvalidException::new);
    }

    public void verifyOtp(
            OtpCode otp,
            String code
    ) {

        LocalDateTime now = LocalDateTime.now();

        if (otp.getExpiresAt().isBefore(now)) {

            throw new OtpExpiredException();
        }

        if (otp.getAttempts() >= MAX_ATTEMPTS) {

            throw  new OtpRateLimitExceededException();

        }

        otp.setAttempts(
                otp.getAttempts() + 1
        );

        boolean valid =
                passwordEncoder.matches(
                        code,
                        otp.getCodeHash()
                );

        otpCodeRepository.save(otp);

        if (!valid) {

            throw new OtpInvalidException();
        }
    }

    public void markAsUsed(OtpCode otp) {

        otp.setUsedAt(
                LocalDateTime.now()
        );

        otpCodeRepository.save(otp);
    }
}