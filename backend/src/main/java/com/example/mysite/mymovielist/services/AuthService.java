package com.example.mysite.mymovielist.services;

import com.example.mysite.mymovielist.DTO.GoogleLoginRequest;
import com.example.mysite.mymovielist.DTO.SignupRequest;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;

    public AuthService(UserService userService) {
        this.userService = userService;
    }

    public Map<String, String> login(String idToken) throws FirebaseAuthException {
        // Verify the Firebase ID token
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

        // Extract user details
        String uid = decodedToken.getUid();
        String email = decodedToken.getEmail();

        // Optional: Generate a custom token (if needed for your use case)
        String customToken = FirebaseAuth.getInstance().createCustomToken(uid);

        // Prepare the response
        Map<String, String> response = new HashMap<>();
        response.put("token", customToken);
        response.put("email", email);

        return response;
    }

    public void signup(SignupRequest request) throws Exception {
        UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                .setEmail(request.getEmail())
                .setPassword(request.getPassword())
                .setDisplayName(request.getDisplayName());
        UserRecord userRecord = FirebaseAuth.getInstance().createUser(createRequest);

        userService.saveUserToFirestore(
                userRecord.getUid(),
                request.getEmail(),
                request.getDisplayName(),
                "email"
        );
    }

    public Map<String, String> googleLogin(GoogleLoginRequest request) throws Exception {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(request.getIdToken());
        String uid = decodedToken.getUid();
        String email = decodedToken.getEmail();
        String displayName = (String) decodedToken.getClaims().getOrDefault("name", "Unknown User");

        // Check if the user exists in Firestore, and save if not
        if (!userService.userExists(uid)) {
            userService.saveUserToFirestore(uid, email, displayName, "google");
        }

        // Generate a custom token
        String customToken = FirebaseAuth.getInstance().createCustomToken(uid);

        // Prepare the response
        Map<String, String> response = new HashMap<>();
        response.put("token", customToken);
        response.put("email", email);

        return response;
    }
}