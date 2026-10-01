package com.jobfindhub.backend.service;

import com.jobfindhub.backend.model.Job;
import com.jobfindhub.backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;
    @Autowired
    public JobService(JobRepository jobRepository) { this.jobRepository = jobRepository; }
    public List<Job> getAllJobs() { return jobRepository.findAll(); }
    public Job createJob(Job job) { return jobRepository.save(job); }
}

