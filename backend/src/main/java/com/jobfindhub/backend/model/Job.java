package com.jobfindhub.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "jobs")
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @NotBlank @Column(nullable = false) private String title;
    @NotBlank @Column(nullable = false) private String company;
    @NotBlank @Column(nullable = false) private String location;
    @NotBlank @Column(name = "job_url", nullable = false, length = 1024) private String jobUrl;
    @NotBlank @Column(nullable = false) private String source;

    public Job() {}
    public Job(String title, String company, String location, String jobUrl, String source) {
        this.title = title; this.company = company; this.location = location; this.jobUrl = jobUrl; this.source = source;
    }
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; } public void setTitle(String title) { this.title = title; }
    public String getCompany() { return company; } public void setCompany(String company) { this.company = company; }
    public String getLocation() { return location; } public void setLocation(String location) { this.location = location; }
    public String getJobUrl() { return jobUrl; } public void setJobUrl(String jobUrl) { this.jobUrl = jobUrl; }
    public String getSource() { return source; } public void setSource(String source) { this.source = source; }
}

