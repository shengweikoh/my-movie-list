package com.example.mysite.mymovielist.services;

import org.springframework.stereotype.Service;

@Service
public class HealthCheckService {

    public String checkHealth() {
        boolean isHealthy = true; // Replace this with your actual health check logic

        if (isHealthy) {
            return "Application is healthy!";
        } else {
            return "Application has issues. Please check!";
        }
    }
}