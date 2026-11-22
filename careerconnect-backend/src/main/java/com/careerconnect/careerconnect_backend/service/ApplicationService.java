package com.careerconnect.careerconnect_backend.service;
import com.careerconnect.careerconnect_backend.dto.ApplicationResponseDTO;
import com.careerconnect.careerconnect_backend.entity.ApplicationStatus;
import java.util.List;
public interface ApplicationService {
    ApplicationResponseDTO applyForJob(Long jobId, Long seekerId);
    List<ApplicationResponseDTO> getMyApplications(Long seekerId);
    List<ApplicationResponseDTO> getJobApplications(Long recruiterId);
    ApplicationResponseDTO updateStatus(Long applicationId, Long recruiterId, ApplicationStatus status);
}
