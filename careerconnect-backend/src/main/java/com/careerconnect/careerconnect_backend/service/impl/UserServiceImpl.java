package com.careerconnect.careerconnect_backend.service.impl;

import com.careerconnect.careerconnect_backend.dto.UserResponseDTO;
import com.careerconnect.careerconnect_backend.entity.User;
import com.careerconnect.careerconnect_backend.repository.UserRepository;
import com.careerconnect.careerconnect_backend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User get(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserResponseDTO getUserById(Long id) {
        return toDto(get(id));
    }

    public UserResponseDTO updateProfile(Long id, UserResponseDTO r) {
        User u = get(id);
        if (r.getFullName() != null && !r.getFullName().isBlank()) u.setFullName(r.getFullName());
        u.setPhone(r.getPhone());
        u.setLocation(r.getLocation());
        u.setHeadline(r.getHeadline());
        u.setAbout(r.getAbout());
        u.setSkills(r.getSkills());
        return toDto(userRepository.save(u));
    }

    private UserResponseDTO toDto(User u) {
        return new UserResponseDTO(u.getId(), u.getFullName(), u.getEmail(), u.getRole(), u.getPhone(), u.getLocation(), u.getHeadline(), u.getAbout(), u.getSkills());
    }
}
