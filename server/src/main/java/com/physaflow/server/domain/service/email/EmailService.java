package com.physaflow.server.domain.service.email;


import com.physaflow.server.application.exception.business.email.EmailSendingException;
import com.physaflow.server.domain.interfaces.EmailServices;
import com.physaflow.server.domain.model.enums.OtpPurpose;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService implements EmailServices {

    private final JavaMailSender mailSender;
    private final EmailTemplateService emailTemplateService;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.application.name:PhysaFlow}")
    private String applicationName;

    @Value("${app.support.email:support@physaflow.com}")
    private String supportEmail;

    @Value("${app.otp.expiration-minutes:5}")
    private int otpExpirationMinutes;

    @Override
    public void sendOtp(
            String email,
            String code,
            OtpPurpose purpose
    ) {

        try {

            String templateName = purpose == OtpPurpose.ACTIVATION
                    ? "otp-activation.html"
                    : "otp-login.html";

            String subject = purpose == OtpPurpose.ACTIVATION
                    ? "Activate your " + applicationName + " account"
                    : "Your " + applicationName + " login code";

            String htmlContent =
                    emailTemplateService.render(
                            templateName,
                            Map.of(
                                    "APP_NAME", applicationName,
                                    "OTP_CODE", code,
                                    "OTP_EXPIRATION_MINUTES",
                                    String.valueOf(otpExpirationMinutes),
                                    "CURRENT_YEAR",
                                    String.valueOf(Year.now().getValue()),
                                    "SUPPORT_EMAIL",
                                    supportEmail
                            )
                    );

            MimeMessage mimeMessage =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            mimeMessage,
                            true,
                            "UTF-8"
                    );

            helper.setFrom(fromEmail);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);

            log.info(
                    "OTP email sent successfully. purpose={}, recipient={}",
                    purpose,
                    maskEmail(email)
            );

        } catch (MailException | MessagingException e) {

            log.error(
                    "Failed to send OTP email. purpose={}, recipient={}",
                    purpose,
                    maskEmail(email),
                    e
            );

            throw new EmailSendingException(
                    "Unable to send verification email.",
                    e
            );
        }
    }

    private String maskEmail(String email) {

        if (email == null || !email.contains("@")) {
            return "***";
        }

        String[] parts = email.split("@", 2);
        String username = parts[0];

        if (username.length() <= 2) {
            return "***@" + parts[1];
        }

        return username.substring(0, 2)
                + "***@"
                + parts[1];
    }

}