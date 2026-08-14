package com.physaflow.server.application.exception.business.otp;

import com.physaflow.server.application.exception.http.UnauthorizedException;

public class OtpExpiredException extends UnauthorizedException {

    public OtpExpiredException() {
        super(
                "The verification code has expired. Please request a new one.",
                "OTP_EXPIRED"
        );
    }

    public OtpExpiredException(String message) {
        super(
                message,
                "OTP_EXPIRED"
        );
    }
}

