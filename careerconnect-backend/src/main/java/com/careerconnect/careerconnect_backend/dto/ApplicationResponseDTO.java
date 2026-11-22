package com.careerconnect.careerconnect_backend.dto;

import com.careerconnect.careerconnect_backend.entity.ApplicationStatus;
import java.time.LocalDateTime;

public class ApplicationResponseDTO {
    private Long id, jobId, seekerId;
    private String jobTitle, company, seekerName, seekerEmail;
    private LocalDateTime appliedAt;
    private ApplicationStatus status;

    public ApplicationResponseDTO(){}
    public ApplicationResponseDTO(Long id,Long jobId,Long seekerId,String jobTitle,String company,String seekerName,String seekerEmail,LocalDateTime appliedAt,ApplicationStatus status){
        this.id=id;this.jobId=jobId;this.seekerId=seekerId;this.jobTitle=jobTitle;this.company=company;
        this.seekerName=seekerName;this.seekerEmail=seekerEmail;this.appliedAt=appliedAt;this.status=status;
    }
    public Long getId(){return id;} public void setId(Long v){id=v;}
    public Long getJobId(){return jobId;} public void setJobId(Long v){jobId=v;}
    public Long getSeekerId(){return seekerId;} public void setSeekerId(Long v){seekerId=v;}
    public String getJobTitle(){return jobTitle;} public void setJobTitle(String v){jobTitle=v;}
    public String getCompany(){return company;} public void setCompany(String v){company=v;}
    public String getSeekerName(){return seekerName;} public void setSeekerName(String v){seekerName=v;}
    public String getSeekerEmail(){return seekerEmail;} public void setSeekerEmail(String v){seekerEmail=v;}
    public LocalDateTime getAppliedAt(){return appliedAt;} public void setAppliedAt(LocalDateTime v){appliedAt=v;}
    public ApplicationStatus getStatus(){return status;} public void setStatus(ApplicationStatus v){status=v;}
}
