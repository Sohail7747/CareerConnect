package com.careerconnect.careerconnect_backend.service;
import com.careerconnect.careerconnect_backend.dto.UserResponseDTO;
public interface UserService {
    UserResponseDTO getUserById(Long id);
    UserResponseDTO updateProfile(Long id, UserResponseDTO request);
}
