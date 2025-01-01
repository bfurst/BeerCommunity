package com.example.beercommunity.dto;

public class ReportResponseDto {

    private String username;

    private String categoryName;

    private String description;

    public ReportResponseDto() {
        
    }

    public ReportResponseDto(String username, String categoryName, String description) {
        this.username = username;
        this.categoryName = categoryName;
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
