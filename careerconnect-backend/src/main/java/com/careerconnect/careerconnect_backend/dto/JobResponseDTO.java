package com.careerconnect.careerconnect_backend.dto;

public class JobResponseDTO {
    private Long id;
    private String title, company, location, jobType, salary, experience, description, skills;
    private RecruiterResponseDTO recruiter;

    public JobResponseDTO() {}
    public JobResponseDTO(Long id, String title, String company, String location, String jobType,
                           String salary, String experience, String description, String skills,
                           RecruiterResponseDTO recruiter) {
        this.id=id; this.title=title; this.company=company; this.location=location;
        this.jobType=jobType; this.salary=salary; this.experience=experience;
        this.description=description; this.skills=skills; this.recruiter=recruiter;
    }
    public Long getId(){return id;} public void setId(Long v){id=v;}
    public String getTitle(){return title;} public void setTitle(String v){title=v;}
    public String getCompany(){return company;} public void setCompany(String v){company=v;}
    public String getLocation(){return location;} public void setLocation(String v){location=v;}
    public String getJobType(){return jobType;} public void setJobType(String v){jobType=v;}
    public String getSalary(){return salary;} public void setSalary(String v){salary=v;}
    public String getExperience(){return experience;} public void setExperience(String v){experience=v;}
    public String getDescription(){return description;} public void setDescription(String v){description=v;}
    public String getSkills(){return skills;} public void setSkills(String v){skills=v;}
    public RecruiterResponseDTO getRecruiter(){return recruiter;} public void setRecruiter(RecruiterResponseDTO v){recruiter=v;}
}
