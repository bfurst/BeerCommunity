package com.example.beercommunity.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class CustomExceptions {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public static class BadRequestException extends RuntimeException {
        public BadRequestException() {
            super("The request could not be understood or was missing required parameters.");
        }
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public static class ReCaptchaValidationFailedException extends RuntimeException {
        public ReCaptchaValidationFailedException() {
            super("The reCAPTCHA verification failed. Please try again.");
        }
    }

    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    public static class ForbiddenAccessException extends RuntimeException {
        public ForbiddenAccessException() {
            super("You are not authorized to access this resource.");
        }
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public static class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException() {
            super("The resource you requested was not found.");
        }
    }

    @ResponseStatus(value = HttpStatus.CONFLICT)
    public static class ConflictException extends RuntimeException {
        public ConflictException() {
            super("There is a conflict with the current state of the resource.");
        }
    }

    @ResponseStatus(value = HttpStatus.TOO_MANY_REQUESTS)
    public static class TooManyRequestsException extends RuntimeException {

        public TooManyRequestsException() {
            super("You have sent too many requests in a short period of time. Please, slow down and try again later.");
        }
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public static class InternalServerErrorException extends RuntimeException {
        public InternalServerErrorException() {
            super("An unexpected error occurred on the server.");
        }
    }
}

