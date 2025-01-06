package com.example.mysite.mymovielist.controllers;

import com.example.mysite.mymovielist.DTO.LoginRequest;
import com.example.mysite.mymovielist.DTO.SignupRequest;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // Create a new user in Firebase
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                    .setEmail(request.getEmail())
                    .setPassword(request.getPassword())
                    .setDisplayName(request.getDisplayName());
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(createRequest);

            // Respond with the created user's UID
            return ResponseEntity.ok("User created successfully: " + userRecord.getUid());
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(400).body("Error creating user: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // Generate a custom Firebase token for the user
            String token = FirebaseAuth.getInstance().createCustomToken(request.getEmail());
            return ResponseEntity.ok(token);
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(400).body("Error logging in: " + e.getMessage());
        }
    }
}