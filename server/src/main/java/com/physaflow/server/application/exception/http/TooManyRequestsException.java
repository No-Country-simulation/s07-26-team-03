package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 429 - Too Many Requests
public class TooManyRequestsException extends ApplicationException {
    public TooManyRequestsException(String message) {
        super( "OTP_TOO_MANY_ATTEMPTS", message, HttpStatus.TOO_MANY_REQUESTS);
    }
}
