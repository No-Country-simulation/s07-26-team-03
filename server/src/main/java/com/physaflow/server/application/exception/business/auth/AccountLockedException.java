package com.physaflow.server.application.exception.business.auth;

import com.physaflow.server.application.exception.http.ForbiddenException;

public class AccountLockedException extends ForbiddenException {
    public AccountLockedException(String message) {
        super(message);
    }
}
