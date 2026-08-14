package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 422 - Unprocessable Entity (para validaciones de negocio)
public class UnprocessableEntityException extends ApplicationException {
    public UnprocessableEntityException(String message) {
        super( "UNPROCESSABLE", message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    public UnprocessableEntityException(String message, String errorCode) {
        super( errorCode, message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
