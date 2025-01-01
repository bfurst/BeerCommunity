package com.example.beercommunity.dto;

public class CreateReviewDto {

    private Integer beerId;

    private Integer rating;

    private String description;

    public Integer getBeerId() {
        return beerId;
    }

    public void setBeerId(Integer beerId) {
        this.beerId = beerId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    @Override
    public String toString() {
        return "CreateReviewDto{" +
                "beerId='" + beerId + '\'' +
                ", rating='" + rating + '\'' +
                ", description=" + description +
                '}';
    }
}
