package com.example.beercommunity.dto;

public class ReviewsCountDto {

    private String username;

    private Integer numberOfReviews;

    public ReviewsCountDto(String username, Integer numberOfReviews) {
        this.username = username;
        this.numberOfReviews = numberOfReviews;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(Integer numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    
}
