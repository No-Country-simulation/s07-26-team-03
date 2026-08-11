package com.physaflow.server.application.exception.business.auth;


import com.physaflow.server.application.exception.ApplicationException;
import com.physaflow.server.application.exception.http.UnauthorizedException;
import org.springframework.http.HttpStatus;


public class InvalidCredentialsException extends UnauthorizedException {
    public InvalidCredentialsException() {
        super("INVALID_CREDENTIALS","Invalid verification credentials.");
    }

    public InvalidCredentialsException(String message) {
        super("INVALID_CREDENTIALS", message);
    }
}


