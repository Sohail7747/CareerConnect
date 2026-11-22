package com.careerconnect.careerconnect_backend.controller;

import com.careerconnect.careerconnect_backend.dto.JobResponseDTO;
import com.careerconnect.careerconnect_backend.entity.Job;
import com.careerconnect.careerconnect_backend.service.JobService;
import com.careerconnect.careerconnect_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/jobs")
public class JobController {
    private final JobService service; private final UserRepository users;
    public JobController(JobService service,UserRepository users){this.service=service;this.users=users;}
    private void verify(Long id, Authentication auth){
        var u=users.findById(id).orElseThrow(()->new RuntimeException("User not found"));
        if(!u.getEmail().equals(auth.getName())) throw new RuntimeException("Not authorized");
    }

    @GetMapping public ResponseEntity<List<JobResponseDTO>> all(@RequestParam(required=false) String q,@RequestParam(required=false) String location,@RequestParam(required=false) String type){
        return ResponseEntity.ok(service.getAllJobs(q,location,type));
    }
    @GetMapping("/{id}") public ResponseEntity<JobResponseDTO> one(@PathVariable Long id){return ResponseEntity.ok(service.getJob(id));}
    @GetMapping("/recruiter/{id}") public ResponseEntity<List<JobResponseDTO>> recruiter(@PathVariable Long id){return ResponseEntity.ok(service.getJobsByRecruiter(id));}
    @PostMapping("/recruiter/{id}") public ResponseEntity<JobResponseDTO> create(@PathVariable Long id,@RequestBody Job job,Authentication auth){verify(id,auth);return new ResponseEntity<>(service.createJob(job,id),HttpStatus.CREATED);}
    @PutMapping("/{id}") public ResponseEntity<JobResponseDTO> update(@PathVariable Long id,@RequestBody Job job,@RequestParam Long recruiterId,Authentication auth){verify(recruiterId,auth);return ResponseEntity.ok(service.updateJob(id,job,recruiterId));}
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id,@RequestParam Long recruiterId,Authentication auth){verify(recruiterId,auth);service.deleteJob(id,recruiterId);return ResponseEntity.noContent().build();}
}
