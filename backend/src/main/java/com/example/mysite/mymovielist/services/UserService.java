package com.example.mysite.mymovielist.services;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    public void saveUserToFirestore(String uid, String email, String displayName, String authProvider) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        Map<String, Object> userData = new HashMap<>();
        userData.put("uid", uid);
        userData.put("email", email);
        userData.put("displayName", displayName);
        userData.put("createdAt", Instant.now().toString());
        userData.put("authProvider", authProvider);

        db.collection("Users").document(uid).set(userData).get();
    }

    public boolean userExists(String uid) throws Exception {
        Firestore db = FirestoreClient.getFirestore();
        return db.collection("Users").document(uid).get().get().exists();
    }
}