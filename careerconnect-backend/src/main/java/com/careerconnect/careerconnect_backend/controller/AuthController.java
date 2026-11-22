package com.careerconnect.careerconnect_backend.controller;

import com.careerconnect.careerconnect_backend.dto.LoginRequestDTO;
import com.careerconnect.careerconnect_backend.dto.LoginResponseDTO;
import com.careerconnect.careerconnect_backend.dto.UserRequestDTO;
import com.careerconnect.careerconnect_backend.dto.UserResponseDTO;
import com.careerconnect.careerconnect_backend.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(
            @RequestBody UserRequestDTO request) {

        UserResponseDTO response = authService.register(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request) {

        LoginResponseDTO response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}