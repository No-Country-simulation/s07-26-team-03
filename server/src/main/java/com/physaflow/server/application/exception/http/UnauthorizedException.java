package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 401 - Unauthorized
public class UnauthorizedException extends ApplicationException {
    public UnauthorizedException(String message) {
        super( "UNAUTHORIZED", message , HttpStatus.UNAUTHORIZED);
    }
    public UnauthorizedException(String message, String errorCode) {
        super( errorCode, message, HttpStatus.UNAUTHORIZED);
    }
}
