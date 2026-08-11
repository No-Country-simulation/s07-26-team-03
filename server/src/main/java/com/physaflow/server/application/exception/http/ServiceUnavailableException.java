package com.physaflow.server.application.exception.http;

import com.physaflow.server.application.exception.ApplicationException;
import org.springframework.http.HttpStatus;

// 503 - Service Unavailable
public class ServiceUnavailableException extends ApplicationException {
    public ServiceUnavailableException(String message) {
        super("SERVICE_UNAVAILABLE" , message, HttpStatus.SERVICE_UNAVAILABLE);
    }
}
