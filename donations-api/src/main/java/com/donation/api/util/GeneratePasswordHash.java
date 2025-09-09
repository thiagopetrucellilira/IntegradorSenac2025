package com.donation.api.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeneratePasswordHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "123456";
        String hashedPassword = encoder.encode(rawPassword);
        
        System.out.println("Raw password: " + rawPassword);
        System.out.println("BCrypt hash: " + hashedPassword);
        System.out.println("Verification: " + encoder.matches(rawPassword, hashedPassword));
    }
}
