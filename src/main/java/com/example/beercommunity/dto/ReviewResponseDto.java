package com.example.beercommunity.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFilter("RoleFilter")
public class ReviewResponseDto {

    private Integer id;

    private String description;

    private Integer rating;

    private Integer numberOfLikes = 0;

    private Integer numberOfDislikes = 0;

    private Iterable<ReportResponseDto> reviewReports;

    private Boolean userLocked;

    private Boolean isLiked;

    private Boolean isDisliked;

    private Boolean isReported;

    private String reviewerId;

    private String reviewerUsername;

    private String reviewerProfileImage;

    private Integer beerId;

    private Boolean reviewerAccountDeleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private java.time.LocalDateTime createdAt;

    public ReviewResponseDto(Integer id, String description, Integer rating, Integer numberOfLikes,
            Integer numberOfDislikes, Iterable<ReportResponseDto> reviewResponses, Boolean userLocked,
            String reviewerId, String reviewerUsername, String reviewerProfileImage, Boolean reviewerAccountDeleted,
            Integer beerId, LocalDateTime createdAt) {
        this.id = id;
        this.description = description;
        this.rating = rating;
        this.numberOfLikes = numberOfLikes;
        this.numberOfDislikes = numberOfDislikes;
        this.reviewReports = reviewResponses;
        this.userLocked = userLocked;
        this.reviewerId = reviewerId;
        this.reviewerUsername = reviewerUsername;
        this.reviewerProfileImage = reviewerProfileImage;
        this.reviewerAccountDeleted = reviewerAccountDeleted;
        this.beerId = beerId;
        this.createdAt = createdAt;
    }

    public ReviewResponseDto(Integer id, String description, Integer rating, Integer numberOfLikes,
            Integer numberOfDislikes, String reviewerId, String reviewerUsername, String reviewerProfileImage,
            Boolean reviewerAccountDeleted,
            Integer beerId, LocalDateTime createdAt) {
        this.id = id;
        this.description = description;
        this.rating = rating;
        this.numberOfLikes = numberOfLikes;
        this.numberOfDislikes = numberOfDislikes;
        this.reviewerId = reviewerId;
        this.reviewerUsername = reviewerUsername;
        this.reviewerProfileImage = reviewerProfileImage;
        this.reviewerAccountDeleted = reviewerAccountDeleted;
        this.beerId = beerId;
        this.createdAt = createdAt;
    }

    public ReviewResponseDto(Integer id, String description, Integer rating, Integer numberOfLikes,
            Integer numberOfDislikes, Boolean isLiked, Boolean isDisliked, Boolean isReported, String reviewerId,
            String reviewerUsername, String reviewerProfileImage, Boolean reviewerAccountDeleted, Integer beerId,
            LocalDateTime createdAt) {
        this.id = id;
        this.description = description;
        this.rating = rating;
        this.numberOfLikes = numberOfLikes;
        this.numberOfDislikes = numberOfDislikes;
        this.isLiked = isLiked;
        this.isDisliked = isDisliked;
        this.isReported = isReported;
        this.reviewerId = reviewerId;
        this.reviewerUsername = reviewerUsername;
        this.reviewerProfileImage = reviewerProfileImage;
        this.reviewerAccountDeleted = reviewerAccountDeleted;
        this.beerId = beerId;
        this.createdAt = createdAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getNumberOfLikes() {
        return numberOfLikes;
    }

    public void setNumberOfLikes(Integer numberOfLikes) {
        this.numberOfLikes = numberOfLikes;
    }

    public Integer getNumberOfDislikes() {
        return numberOfDislikes;
    }

    public void setNumberOfDislikes(Integer numberOfDislikes) {
        this.numberOfDislikes = numberOfDislikes;
    }

    public Iterable<ReportResponseDto> getReviewReports() {
        return reviewReports;
    }

    public void setReviewReports(Iterable<ReportResponseDto> reviewReports) {
        this.reviewReports = reviewReports;
    }

    public Boolean getUserLocked() {
        return userLocked;
    }

    public void setUserLocked(Boolean userLocked) {
        this.userLocked = userLocked;
    }

    public Boolean getIsLiked() {
        return isLiked;
    }

    public void setIsLiked(Boolean isLiked) {
        this.isLiked = isLiked;
    }

    public Boolean getIsDisliked() {
        return isDisliked;
    }

    public void setIsDisliked(Boolean isDisliked) {
        this.isDisliked = isDisliked;
    }

    public Boolean getIsReported() {
        return isReported;
    }

    public void setIsReported(Boolean isReported) {
        this.isReported = isReported;
    }

    public String getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(String reviewerId) {
        this.reviewerId = reviewerId;
    }

    public String getReviewerUsername() {
        return reviewerUsername;
    }

    public void setReviewerUsername(String reviewerUsername) {
        this.reviewerUsername = reviewerUsername;
    }

    public String getReviewerProfileImage() {
        return reviewerProfileImage;
    }

    public void setReviewerProfileImage(String reviewerProfileImage) {
        this.reviewerProfileImage = reviewerProfileImage;
    }

    public Integer getBeerId() {
        return beerId;
    }

    public void setBeerId(Integer beerId) {
        this.beerId = beerId;
    }

    public Boolean getReviewerAccountDeleted() {
        return reviewerAccountDeleted;
    }

    public void setReviewerAccountDeleted(Boolean reviewerAccountDeleted) {
        this.reviewerAccountDeleted = reviewerAccountDeleted;
    }

    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
