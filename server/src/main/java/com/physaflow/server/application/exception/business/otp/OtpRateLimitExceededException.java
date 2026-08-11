package com.physaflow.server.application.exception.business.otp;

import com.physaflow.server.application.exception.http.TooManyRequestsException;

public class OtpRateLimitExceededException extends TooManyRequestsException {
    public OtpRateLimitExceededException() {
        super("Too many verification attempts. Please try again later.");
    }

    public OtpRateLimitExceededException(String message) {
        super(message);
    }
}

