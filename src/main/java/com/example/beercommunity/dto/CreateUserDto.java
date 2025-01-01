package com.example.beercommunity.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CreateUserDto {

    @NotNull
    @Pattern(regexp = "^[A-Za-z0-9]{4,16}$")
    private String username;

    @Email
    private String email;

    @NotNull
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z])^.{8,255}$")
    private String password;

    @NotNull
    private String token;

    
    public CreateUserDto() {

    }

    public CreateUserDto(String username, String email, String password, String token) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.token = token;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "CreateUserDto{" +
                "username=" + username + 
                ", email=" + email + 
                ", password=" + password +
                ", token=" + token +
                '}';
    }
}
