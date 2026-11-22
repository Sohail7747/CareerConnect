package com.careerconnect.careerconnect_backend.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    ResponseEntity<Map<String, String>> handle(RuntimeException e) {
        String m = e.getMessage() == null ? "Request failed" : e.getMessage();
        HttpStatus status = m.toLowerCase().contains("already") ? HttpStatus.CONFLICT : (m.toLowerCase().contains("not authorized") ? HttpStatus.FORBIDDEN : HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(status).body(Map.of("message", m));
    }
}