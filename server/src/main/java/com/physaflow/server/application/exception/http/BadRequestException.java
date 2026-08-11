package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 400 - Bad Request
public class BadRequestException extends ApplicationException {
    public BadRequestException(String message) {
        super("BAD_REQUEST", message ,HttpStatus.BAD_REQUEST);
    }

    public BadRequestException(String message, String errorCode) {
        super(  errorCode, message, HttpStatus.BAD_REQUEST);
    }
}

