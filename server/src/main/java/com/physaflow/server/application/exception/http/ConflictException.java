package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 409 - Conflict
public class ConflictException extends ApplicationException {
    public ConflictException(String message) {
        super( "CONFLICT" , message,  HttpStatus.CONFLICT);
    }
}
