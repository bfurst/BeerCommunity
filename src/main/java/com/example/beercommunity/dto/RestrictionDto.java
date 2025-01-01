package com.example.beercommunity.dto;

public class RestrictionDto {

    private String userId;

    private String description;

    private Integer reportCategoryId;

    private Integer restrictionCategoryId;

    public RestrictionDto() {

    }

    public RestrictionDto(String userId, String description, Integer reportCategoryId, Integer restrictionCategoryId) {
        this.userId = userId;
        this.description = description;
        this.reportCategoryId = reportCategoryId;
        this.restrictionCategoryId = restrictionCategoryId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getReportCategoryId() {
        return reportCategoryId;
    }

    public void setReportCategoryId(Integer reportCategoryId) {
        this.reportCategoryId = reportCategoryId;
    }

    public Integer getRestrictionCategoryId() {
        return restrictionCategoryId;
    }

    public void setRestrictionCategoryId(Integer restrictionCategoryId) {
        this.restrictionCategoryId = restrictionCategoryId;
    }

    @Override
    public String toString() {
        return "RestrictionDto{" +
                "userId='" + userId + '\'' +
                ", description='" + description + '\'' +
                ", reportCategoryId=" + description +
                ", restrictionCategoryId=" + reportCategoryId +
                '}';
    }
}
