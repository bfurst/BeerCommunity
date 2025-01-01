package com.example.beercommunity.exception;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.beercommunity.BeerCommunityApplication;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    private final DateTimeFormatter ISO8601_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.S'Z'");

    
    @ExceptionHandler(CustomExceptions.BadRequestException.class)
    public ResponseEntity<Object> handleBadRequestException(
            CustomExceptions.BadRequestException exception,
            HttpServletRequest httpServletRequest) {

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(ISO8601_FORMATTER));
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Bad Request");
        body.put("message", exception.getMessage());
        body.put("path", httpServletRequest.getRequestURI());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomExceptions.ReCaptchaValidationFailedException.class)
    public ResponseEntity<Object> handleReCaptchaValidationFailedException(
            CustomExceptions.ReCaptchaValidationFailedException exception,
            HttpServletRequest httpServletRequest) {

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(ISO8601_FORMATTER));
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "reCAPTCHA validation failed");
        body.put("message", exception.getMessage());
        body.put("path", httpServletRequest.getRequestURI());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomExceptions.ForbiddenAccessException.class)
    public ResponseEntity<Object> handleForbiddenAccessException(
            CustomExceptions.ForbiddenAccessException exception,
            HttpServletRequest httpServletRequest) {

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(ISO8601_FORMATTER));
        body.put("status", HttpStatus.FORBIDDEN.value());
        body.put("error", "Forbidden");
        body.put("message", exception.getMessage());
        body.put("path", httpServletRequest.getRequestURI());

        return new ResponseEntity<>(body, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(CustomExceptions.ResourceNotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(
            CustomExceptions.ResourceNotFoundException exception,
            HttpServletRequest httpServletRequest) {

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(ISO8601_FORMATTER));
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "Not Found");
        body.put("message", exception.getMessage());
        body.put("path", httpServletRequest.getRequestURI());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CustomExceptions.ConflictException.class)
    public ResponseEntity<Object> handleNotFoundException(
            CustomExceptions.ConflictException exception,
            HttpServletRequest httpServletRequest) {

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(ISO8601_FORMATTER));
        body.put("status", HttpStatus.CONFLICT.value());
        body.put("error", "Conflict");
        body.put("message", exception.getMessage());
        body.put("path", httpServletRequest.getRequestURI());

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CustomExceptions.TooManyRequestsException.class)
    public ResponseEntity<Object> handleTooManyRequestsException(
            CustomExceptions.TooManyRequestsException exception,
            HttpServletRequest httpServletRequest) {

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(ISO8601_FORMATTER));
        body.put("status", HttpStatus.TOO_MANY_REQUESTS.value());
        body.put("error", "Too Many Requests");
        body.put("message", exception.getMessage());
        body.put("path", httpServletRequest.getRequestURI());

        return new ResponseEntity<>(body, HttpStatus.TOO_MANY_REQUESTS);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneralException(Exception ex, HttpServletRequest httpServletRequest) {
        BeerCommunityApplication.logger.error(ex.getMessage());
        
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().format(ISO8601_FORMATTER));
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", "Internal Server Error");
        body.put("message", "An unexpected error occurred.");
        body.put("path", httpServletRequest.getRequestURI());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
