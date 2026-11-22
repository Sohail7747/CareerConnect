package com.careerconnect.careerconnect_backend.repository;

import com.careerconnect.careerconnect_backend.entity.Job;
import com.careerconnect.careerconnect_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByRecruiterOrderByIdDesc(User recruiter);
    List<Job> findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCaseOrSkillsContainingIgnoreCase(String title,String company,String skills);
}
