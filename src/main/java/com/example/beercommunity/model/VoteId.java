package com.example.beercommunity.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

@Embeddable
public class VoteId implements Serializable {

    private String userId;

    private Integer reviewId;

    public VoteId() {

    }

    public VoteId(String userId, Integer reviewId) {
        this.userId = userId;
        this.reviewId = reviewId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) 
            return true;

        if (o == null || getClass() != o.getClass()) 
            return false;
            
        VoteId voteId = (VoteId) o;
        return Objects.equals(userId, voteId.userId) &&
               Objects.equals(reviewId, voteId.reviewId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, reviewId);
    }
}
