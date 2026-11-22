package com.careerconnect.careerconnect_backend.service.impl;

import com.careerconnect.careerconnect_backend.dto.*;
import com.careerconnect.careerconnect_backend.entity.User;
import com.careerconnect.careerconnect_backend.repository.UserRepository;
import com.careerconnect.careerconnect_backend.security.JwtService;
import com.careerconnect.careerconnect_backend.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
    public AuthServiceImpl(UserRepository users,PasswordEncoder encoder,JwtService jwt){this.users=users;this.encoder=encoder;this.jwt=jwt;}

    public UserResponseDTO register(UserRequestDTO r){
        if(users.findByEmail(r.getEmail()).isPresent()) throw new RuntimeException("Email already registered");
        if(r.getRole()==null) throw new RuntimeException("Role is required");
        if(r.getRole().name().equals("ADMIN")) throw new RuntimeException("Admin registration is not allowed");
        User u=new User(r.getFullName(),r.getEmail(),encoder.encode(r.getPassword()),r.getRole());
        u=users.save(u);
        return toDto(u);
    }
    public LoginResponseDTO login(LoginRequestDTO r){
        User u=users.findByEmail(r.getEmail()).orElseThrow(()->new RuntimeException("Invalid email or password"));
        if(!encoder.matches(r.getPassword(),u.getPassword())) throw new RuntimeException("Invalid email or password");
        return new LoginResponseDTO(u.getId(),u.getFullName(),u.getEmail(),u.getRole(),jwt.generateToken(u.getEmail(),u.getRole().name()));
    }
    private UserResponseDTO toDto(User u){return new UserResponseDTO(u.getId(),u.getFullName(),u.getEmail(),u.getRole(),u.getPhone(),u.getLocation(),u.getHeadline(),u.getAbout(),u.getSkills());}
}
