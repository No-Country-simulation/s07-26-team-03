package com.physaflow.server.application.exception.business.entity;

import com.physaflow.server.application.exception.http.NotFoundException;

public class EntityNotFoundException extends NotFoundException {
    public EntityNotFoundException(String entityName, Long id) {
        super(String.format("%s not found with id: %d", entityName, id), "ENTITY_NOT_FOUND");
    }

    public EntityNotFoundException(String message) {
        super(message, "ENTITY_NOT_FOUND");
    }
}
