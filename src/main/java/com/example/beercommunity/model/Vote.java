package com.example.beercommunity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "votes")
public class Vote {

    @EmbeddedId
    @JsonIgnore
    private VoteId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("reviewId")
    @JoinColumn(name = "review_id")
    @JsonIgnore
    private Review review;

    @Column(length = 7, nullable = false)
    @JsonIgnore
    private String type;

    public Vote() {
        
    }

    public Vote(User user, Review review, String type) {
        this.id = new VoteId(user.getId(), review.getId());
        this.type = type;
    }

    public Vote(String userId, Integer reviewId, String type) {
        this.id = new VoteId(userId, reviewId);
        this.user = new User(userId);
        this.review = new Review(reviewId);
        this.type = type;
    }

    public VoteId getId() {
        return id;
    }

    public void setId(VoteId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
