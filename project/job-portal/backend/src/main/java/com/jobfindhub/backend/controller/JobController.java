package com.jobfindhub.backend.controller;

import com.jobfindhub.backend.model.Job;
import com.jobfindhub.backend.service.JobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.56.101:5173"}) // <-- Added this security rule!
@RequestMapping("/jobs")
public class JobController {
    
    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) { 
        this.jobService = jobService; 
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() { 
        return ResponseEntity.ok(jobService.getAllJobs()); 
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        return new ResponseEntity<>(jobService.createJob(job), HttpStatus.CREATED);
    }
}

