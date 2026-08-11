package com.physaflow.server.application.exception.business.otp;

import com.physaflow.server.application.exception.http.ConflictException;

public class OtpAlreadyUsedException extends ConflictException {
    public OtpAlreadyUsedException() {
        super("This verification code has already been used.");
    }
}
