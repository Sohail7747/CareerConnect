package com.careerconnect.careerconnect_backend.service.impl;

import com.careerconnect.careerconnect_backend.dto.ApplicationResponseDTO;
import com.careerconnect.careerconnect_backend.entity.*;
import com.careerconnect.careerconnect_backend.repository.*;
import com.careerconnect.careerconnect_backend.service.ApplicationService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applications; private final JobRepository jobs; private final UserRepository users;
    public ApplicationServiceImpl(ApplicationRepository a,JobRepository j,UserRepository u){applications=a;jobs=j;users=u;}

    public ApplicationResponseDTO applyForJob(Long jobId,Long seekerId){
        Job job=jobs.findById(jobId).orElseThrow(()->new RuntimeException("Job not found"));
        User seeker=users.findById(seekerId).orElseThrow(()->new RuntimeException("User not found"));
        if(seeker.getRole()!=Role.JOB_SEEKER) throw new RuntimeException("Only job seekers can apply");
        if(applications.existsByJobAndSeeker(job,seeker)) throw new RuntimeException("You have already applied for this job");
        Application a=new Application(); a.setJob(job);a.setSeeker(seeker);a.setAppliedAt(LocalDateTime.now());a.setStatus(ApplicationStatus.PENDING);
        return toDto(applications.save(a));
    }
    public List<ApplicationResponseDTO> getMyApplications(Long seekerId){
        User s=users.findById(seekerId).orElseThrow(()->new RuntimeException("User not found"));
        return applications.findBySeekerOrderByAppliedAtDesc(s).stream().map(this::toDto).toList();
    }
    public List<ApplicationResponseDTO> getJobApplications(Long recruiterId){
        User r=users.findById(recruiterId).orElseThrow(()->new RuntimeException("Recruiter not found"));
        return applications.findByJobRecruiterOrderByAppliedAtDesc(r).stream().map(this::toDto).toList();
    }
    public ApplicationResponseDTO updateStatus(Long applicationId,Long recruiterId,ApplicationStatus status){
        Application a=applications.findById(applicationId).orElseThrow(()->new RuntimeException("Application not found"));
        if(!a.getJob().getRecruiter().getId().equals(recruiterId)) throw new RuntimeException("Not authorized");
        a.setStatus(status); return toDto(applications.save(a));
    }
    private ApplicationResponseDTO toDto(Application a){
        return new ApplicationResponseDTO(a.getId(),a.getJob().getId(),a.getSeeker().getId(),a.getJob().getTitle(),a.getJob().getCompany(),
            a.getSeeker().getFullName(),a.getSeeker().getEmail(),a.getAppliedAt(),a.getStatus());
    }
}
