package com.careerconnect.careerconnect_backend.service;

import com.careerconnect.careerconnect_backend.dto.LoginRequestDTO;
import com.careerconnect.careerconnect_backend.dto.LoginResponseDTO;
import com.careerconnect.careerconnect_backend.dto.UserRequestDTO;
import com.careerconnect.careerconnect_backend.dto.UserResponseDTO;

public interface AuthService {

    UserResponseDTO register(UserRequestDTO request);

    LoginResponseDTO login(LoginRequestDTO request);
}