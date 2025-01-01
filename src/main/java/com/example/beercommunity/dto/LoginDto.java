package com.example.beercommunity.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginDto {

    @NotNull
    private String input;

    @NotNull
    @Size(min = 8, max = 255)
    private String password;

    private Boolean remember;

    public LoginDto() {

    }

    public LoginDto(String input, String password, Boolean remember) {
        this.input = input;
        this.password = password;
        this.remember = remember;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getRemember() {
        return remember;
    }

    public void setRemember(Boolean remember) {
        this.remember = remember;
    }

    @Override
    public String toString() {
        return "LoginDto{" +
                "input=" + input +
                ", password='" + password + 
                ", remember=" + remember +
                '}';
    }
}
