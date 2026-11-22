package com.careerconnect.careerconnect_backend.service.impl;

import com.careerconnect.careerconnect_backend.dto.*;
import com.careerconnect.careerconnect_backend.entity.Job;
import com.careerconnect.careerconnect_backend.entity.User;
import com.careerconnect.careerconnect_backend.entity.Role;
import com.careerconnect.careerconnect_backend.repository.*;
import com.careerconnect.careerconnect_backend.service.JobService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository; private final UserRepository userRepository;
    public JobServiceImpl(JobRepository j,UserRepository u){jobRepository=j;userRepository=u;}

    private User recruiter(Long id){
        User u=userRepository.findById(id).orElseThrow(()->new RuntimeException("Recruiter not found"));
        if(u.getRole()!=Role.RECRUITER) throw new RuntimeException("User is not a recruiter");
        return u;
    }

    public JobResponseDTO createJob(Job job,Long recruiterId){
        job.setId(null); job.setRecruiter(recruiter(recruiterId));
        return toDto(jobRepository.save(job));
    }

    public List<JobResponseDTO> getJobsByRecruiter(Long recruiterId){
        return jobRepository.findByRecruiterOrderByIdDesc(recruiter(recruiterId)).stream().map(this::toDto).toList();
    }

    public List<JobResponseDTO> getAllJobs(String q,String location,String type){
        List<Job> jobs=(q==null||q.isBlank()) ? jobRepository.findAll() :
            jobRepository.findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrSkillsContainingIgnoreCase(q,q,q);
        return jobs.stream().filter(j->location==null||location.isBlank()||location.equalsIgnoreCase(j.getLocation()))
            .filter(j->type==null||type.isBlank()||type.equalsIgnoreCase(j.getJobType())).map(this::toDto).toList();
    }

    public JobResponseDTO getJob(Long id){return toDto(jobRepository.findById(id).orElseThrow(()->new RuntimeException("Job not found")));}

    public JobResponseDTO updateJob(Long id,Job input,Long recruiterId){
        Job j=jobRepository.findById(id).orElseThrow(()->new RuntimeException("Job not found"));
        if(!j.getRecruiter().getId().equals(recruiterId)) throw new RuntimeException("Not authorized");
        j.setTitle(input.getTitle()); j.setCompany(input.getCompany()); j.setLocation(input.getLocation());
        j.setJobType(input.getJobType()); j.setSalary(input.getSalary()); j.setExperience(input.getExperience());
        j.setDescription(input.getDescription()); j.setSkills(input.getSkills());
        return toDto(jobRepository.save(j));
    }

    public void deleteJob(Long id,Long recruiterId){
        Job j=jobRepository.findById(id).orElseThrow(()->new RuntimeException("Job not found"));
        if(!j.getRecruiter().getId().equals(recruiterId)) throw new RuntimeException("Not authorized");
        jobRepository.delete(j);
    }

    private JobResponseDTO toDto(Job j){
        User r=j.getRecruiter();
        return new JobResponseDTO(j.getId(),j.getTitle(),j.getCompany(),j.getLocation(),j.getJobType(),j.getSalary(),j.getExperience(),j.getDescription(),j.getSkills(),
            new RecruiterResponseDTO(r.getId(),r.getFullName(),r.getEmail(),r.getRole()));
    }
}
