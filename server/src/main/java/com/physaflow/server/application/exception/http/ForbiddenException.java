package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 403 - Forbidden
public class ForbiddenException extends ApplicationException {
    public ForbiddenException(String message) {
        super("FORBIDDEN", message, HttpStatus.FORBIDDEN);
    }
}
