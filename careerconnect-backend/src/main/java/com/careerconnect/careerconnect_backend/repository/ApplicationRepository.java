package com.careerconnect.careerconnect_backend.repository;

import com.careerconnect.careerconnect_backend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findBySeekerOrderByAppliedAtDesc(User seeker);
    List<Application> findByJobRecruiterOrderByAppliedAtDesc(User recruiter);
    boolean existsByJobAndSeeker(Job job, User seeker);
    long countByJobRecruiter(User recruiter);
    long countByJobRecruiterAndStatus(User recruiter, ApplicationStatus status);
}
