package com.careerconnect.careerconnect_backend.controller;

import com.careerconnect.careerconnect_backend.dto.ApplicationResponseDTO;
import com.careerconnect.careerconnect_backend.entity.ApplicationStatus;
import com.careerconnect.careerconnect_backend.service.ApplicationService;
import com.careerconnect.careerconnect_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/applications")
public class ApplicationController {
    private final ApplicationService service; private final UserRepository users;
    public ApplicationController(ApplicationService service,UserRepository users){this.service=service;this.users=users;}
    private void verify(Long id, Authentication auth){
        var u=users.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        if(!u.getEmail().equals(auth.getName())) throw new RuntimeException("Not authorized");
    }

    @PostMapping("/apply") public ResponseEntity<ApplicationResponseDTO> apply(@RequestParam Long jobId,@RequestParam Long seekerId,Authentication auth){ verify(seekerId,auth);
        return new ResponseEntity<>(service.applyForJob(jobId,seekerId),HttpStatus.CREATED);
    }
    @GetMapping("/my") public ResponseEntity<List<ApplicationResponseDTO>> my(@RequestParam Long seekerId,Authentication auth){ verify(seekerId,auth);return ResponseEntity.ok(service.getMyApplications(seekerId));}
    @GetMapping("/recruiter/{recruiterId}") public ResponseEntity<List<ApplicationResponseDTO>> recruiter(@PathVariable Long recruiterId,Authentication auth){ verify(recruiterId,auth);return ResponseEntity.ok(service.getJobApplications(recruiterId));}
    @PutMapping("/{id}/status") public ResponseEntity<ApplicationResponseDTO> status(@PathVariable Long id,@RequestParam Long recruiterId,@RequestBody StatusRequest request,Authentication auth){ verify(recruiterId,auth);
        return ResponseEntity.ok(service.updateStatus(id,recruiterId,request.status()));
    }
    public record StatusRequest(ApplicationStatus status){}
}
