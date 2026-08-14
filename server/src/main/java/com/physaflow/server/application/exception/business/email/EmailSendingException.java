package com.physaflow.server.application.exception.business.email;

import com.physaflow.server.application.exception.http.ServiceUnavailableException;

public class EmailSendingException extends ServiceUnavailableException {
    public EmailSendingException(String message) {
        super("Failed to send email. Please try again later.");
    }

    public EmailSendingException(String message, Throwable cause) {
        super("Failed to send email: " + message);
    }
}
