package com.careerconnect.careerconnect_backend.service;
import com.careerconnect.careerconnect_backend.dto.JobResponseDTO;
import com.careerconnect.careerconnect_backend.entity.Job;
import java.util.List;
public interface JobService {
    JobResponseDTO createJob(Job job, Long recruiterId);
    List<JobResponseDTO> getJobsByRecruiter(Long recruiterId);
    List<JobResponseDTO> getAllJobs(String q,String location,String type);
    JobResponseDTO getJob(Long id);
    JobResponseDTO updateJob(Long id, Job job, Long recruiterId);
    void deleteJob(Long id, Long recruiterId);
}
