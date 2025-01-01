package com.example.beercommunity.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class UserDto {

    private String id;

    private String username;

    private String email;

    private String profileImage;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime accountCreated;

    private String role;

    public UserDto(String id, String username, String email, String profileImage, LocalDateTime accountCreated, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profileImage = profileImage;
        this.accountCreated = accountCreated;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public LocalDateTime getAccountCreated() {
        return accountCreated;
    }

    public void setAccountCreated(LocalDateTime accountCreated) {
        this.accountCreated = accountCreated;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
