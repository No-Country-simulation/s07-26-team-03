package com.physaflow.server.application.exception.business.otp;

import com.physaflow.server.application.exception.http.UnauthorizedException;

public class OtpInvalidException extends UnauthorizedException {

    public OtpInvalidException() {
        super(
                "Invalid verification code. Please request a new one.",
                "INVALID_OTP"
        );
    }

    public OtpInvalidException(String message) {
        super(
                message,
                "INVALID_OTP"
        );
    }
}

