package com.careerconnect.careerconnect_backend.controller;

import com.careerconnect.careerconnect_backend.dto.UserResponseDTO;
import com.careerconnect.careerconnect_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    private void verify(Long id, Authentication auth) {
        var u = service.getUserById(id);
        if (!u.getEmail().equals(auth.getName())) throw new RuntimeException("Not authorized");
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> get(@PathVariable Long id, Authentication auth) {
        verify(id, auth);
        return ResponseEntity.ok(service.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> update(@PathVariable Long id, @RequestBody UserResponseDTO request, Authentication auth) {
        verify(id, auth);
        return ResponseEntity.ok(service.updateProfile(id, request));
    }


}
