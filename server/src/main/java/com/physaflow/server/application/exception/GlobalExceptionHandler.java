package com.physaflow.server.application.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.mail.MailException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.net.URI;
import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(ConfigurationNotFoundException.class)
//    public ProblemDetail handleConfigurationNotFound(ConfigurationNotFoundException ex) {
//        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
//        problem.setTitle("System Configuration Error");
//        problem.setType(URI.create("[https://api.physaflow.com/errors/config-missing](https://api.physaflow.com/errors/config-missing)"));
//        problem.setProperty("timestamp", Instant.now());
//        return problem;
//    }

    /**
     * ==========================================
     * APPLICATION EXCEPTIONS
     * ==========================================
     */

    @ExceptionHandler(ApplicationException.class)
    public ProblemDetail handleApplicationException(
            ApplicationException ex
    ) {

        log.warn(
                "Application error [{}]: {}",
                ex.getCode(),
                ex.getMessage()
        );

        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                ex.getStatus(),
                ex.getMessage()
        );

        problem.setTitle(
                ex.getStatus().getReasonPhrase()
        );

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/"
                                + ex.getCode().toLowerCase()
                )
        );

        problem.setProperty(
                "code",
                ex.getCode()
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * DTO VALIDATION
     * ==========================================
     *
     * @Valid @RequestBody
     */

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex
    ) {

        Map<String, String> errors =
                ex.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .collect(Collectors.toMap(
                                FieldError::getField,
                                error -> error.getDefaultMessage() != null
                                        ? error.getDefaultMessage()
                                        : "Invalid value",
                                (existing, replacement) -> existing
                        ));

        log.warn(
                "Request validation failed: {}",
                errors
        );

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.BAD_REQUEST,
                        "One or more fields are invalid."
                );

        problem.setTitle("Validation Error");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/validation-error"
                )
        );

        problem.setProperty(
                "code",
                "VALIDATION_ERROR"
        );

        problem.setProperty(
                "validationErrors",
                errors
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * METHOD VALIDATION
     * ==========================================
     *
     * @Validated / method parameters
     */

    @ExceptionHandler(HandlerMethodValidationException.class)
    public ProblemDetail handleMethodValidation(
            HandlerMethodValidationException ex
    ) {

        log.warn(
                "Method validation failed: {}",
                ex.getMessage()
        );

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.BAD_REQUEST,
                        "One or more request parameters are invalid."
                );

        problem.setTitle("Validation Error");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/validation-error"
                )
        );

        problem.setProperty(
                "code",
                "VALIDATION_ERROR"
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * CONSTRAINT VALIDATION
     * ==========================================
     */

    @ExceptionHandler(ConstraintViolationException.class)
    public ProblemDetail handleConstraintViolation(
            ConstraintViolationException ex
    ) {

        Map<String, String> errors =
                ex.getConstraintViolations()
                        .stream()
                        .collect(Collectors.toMap(
                                violation ->
                                        violation.getPropertyPath().toString(),
                                ConstraintViolation::getMessage,
                                (existing, replacement) -> existing
                        ));

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.BAD_REQUEST,
                        "One or more constraints were violated."
                );

        problem.setTitle("Validation Error");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/constraint-violation"
                )
        );

        problem.setProperty(
                "code",
                "VALIDATION_ERROR"
        );

        problem.setProperty(
                "validationErrors",
                errors
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * MALFORMED JSON
     * ==========================================
     */

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ProblemDetail handleMessageNotReadable(
            HttpMessageNotReadableException ex
    ) {

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.BAD_REQUEST,
                        "The request body is invalid or malformed."
                );

        problem.setTitle("Invalid Request Format");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/invalid-json"
                )
        );

        problem.setProperty(
                "code",
                "INVALID_JSON"
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * INVALID URL PARAMETER
     * ==========================================
     */

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ProblemDetail handleTypeMismatch(
            MethodArgumentTypeMismatchException ex
    ) {

        String message = String.format(
                "Parameter '%s' with value '%s' is invalid.",
                ex.getName(),
                ex.getValue()
        );

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.BAD_REQUEST,
                        message
                );

        problem.setTitle("Invalid Parameter");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/invalid-parameter"
                )
        );

        problem.setProperty(
                "code",
                "INVALID_PARAMETER"
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * MAIL
     * ==========================================
     */

    @ExceptionHandler(MailException.class)
    public ProblemDetail handleMailException(
            MailException ex
    ) {

        log.error(
                "Email sending error",
                ex
        );

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.SERVICE_UNAVAILABLE,
                        "We're experiencing issues sending emails. Please try again later."
                );

        problem.setTitle("Email Service Error");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/email-service"
                )
        );

        problem.setProperty(
                "code",
                "EMAIL_SERVICE_UNAVAILABLE"
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * ACCESS DENIED
     * ==========================================
     */

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(
            AccessDeniedException ex
    ) {

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.FORBIDDEN,
                        "You don't have permission to access this resource."
                );

        problem.setTitle("Access Denied");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/access-denied"
                )
        );

        problem.setProperty(
                "code",
                "ACCESS_DENIED"
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * CONFIGURATION
     * ==========================================
     */

    @ExceptionHandler(ConfigurationNotFoundException.class)
    public ProblemDetail handleConfigurationNotFound(
            ConfigurationNotFoundException ex
    ) {

        log.error(
                "Configuration error",
                ex
        );

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "A required system configuration is missing."
                );

        problem.setTitle("System Configuration Error");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/configuration-error"
                )
        );

        problem.setProperty(
                "code",
                "CONFIGURATION_ERROR"
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


    /**
     * ==========================================
     * FALLBACK
     * ==========================================
     */

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(
            Exception ex
    ) {

        log.error(
                "Unexpected error",
                ex
        );

        ProblemDetail problem =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "An unexpected internal error occurred. Please try again later."
                );

        problem.setTitle("Internal Server Error");

        problem.setType(
                URI.create(
                        "https://api.physaflow.com/errors/internal-error"
                )
        );

        problem.setProperty(
                "code",
                "INTERNAL_ERROR"
        );

        problem.setProperty(
                "timestamp",
                Instant.now()
        );

        return problem;
    }


}