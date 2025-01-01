package com.example.beercommunity.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "reports")
public class Report {

    @EmbeddedId
    @JsonIgnore
    private ReportId id;

    @Column(columnDefinition = "text", length = 2000, nullable = true)
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    @JsonIgnore
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("reviewId")
    @JoinColumn(name = "review_id")
    @JsonIgnore
    private Review review;

    @ManyToOne
    @JoinColumn(name = "report_category_id")
    @JsonIgnore
    private ReportCategory reportCategory;

    public Report() {

    }

    public Report(User user, Review review, String description, ReportCategory reportCategory) {
        this.id = new ReportId(user.getId(), review.getId());
        this.user = user;
        this.review = review;
        this.description = description;
        this.reportCategory = reportCategory;
    }

    public Report(String userId, Integer reviewId, String description, Integer reportCategoryId) {
        this.id = new ReportId(userId, reviewId);
        this.user = new User(userId);
        this.review = new Review(reviewId);
        this.description = description;
        this.reportCategory = new ReportCategory(reportCategoryId);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
