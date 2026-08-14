package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 404 - Not Found
public class NotFoundException extends ApplicationException {
    public NotFoundException(String message) {
        super(  "NOT_FOUND", message, HttpStatus.NOT_FOUND);
    }

    public NotFoundException(String message, String errorCode) {
        super(errorCode, message,  HttpStatus.NOT_FOUND);
    }
}
