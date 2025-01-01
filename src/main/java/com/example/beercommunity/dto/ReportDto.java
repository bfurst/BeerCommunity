package com.example.beercommunity.dto;

public class ReportDto {

    private Integer reviewId;

    private Integer categoryId;

    private String description;

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "ReportDto{" +
                "reviewId='" + reviewId + '\'' +
                ", categoryId=" + categoryId +
                ", description=" + description +
                '}';
    }
}
