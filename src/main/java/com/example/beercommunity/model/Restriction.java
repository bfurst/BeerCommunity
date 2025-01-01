package com.example.beercommunity.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "restrictions")
public class Restriction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "text", length = 2000, nullable = false)
    private String description;

    @Column(name = "is_active", columnDefinition = "BIT DEFAULT 1")
    Boolean isActive;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "expires_at", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime expiresAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_user_id", nullable = false)
    @JsonIgnore
    private User applicantUser;

    @ManyToOne
    @JoinColumn(name = "report_category_id", nullable = false)
    @JsonIgnore
    private ReportCategory reportCategory;

    @ManyToOne
    @JoinColumn(name = "restriction_category_id", nullable = false)
    @JsonIgnore
    private RestrictionCategory restrictionCategory;

    public Restriction() {
    }

    public Restriction(Integer id) {
        this.id = id;
    }

    public Restriction(Integer id, String description, Boolean isActive, LocalDateTime expiresAt, User user, User applicantUser,
            ReportCategory reportCategory, RestrictionCategory restrictionCategory) {
        this.id = id;
        this.description = description;
        this.isActive = isActive;
        this.expiresAt = expiresAt;
        this.user = user;
        this.applicantUser = applicantUser;
        this.reportCategory = reportCategory;
        this.restrictionCategory = restrictionCategory;
    }

    public Restriction(String description, Boolean isActive, LocalDateTime expiresAt, User user, User applicantUser,
            ReportCategory reportCategory, RestrictionCategory restrictionCategory) {
        this.description = description;
        this.isActive = isActive;
        this.expiresAt = expiresAt;
        this.user = user;
        this.applicantUser = applicantUser;
        this.reportCategory = reportCategory;
        this.restrictionCategory = restrictionCategory;
    }

    public Restriction(String description, Boolean isActive, LocalDateTime expiresAt, String userId, String applicantUserId,
            Integer reportCategoryId, Integer restrictionCategoryId) {
        this.description = description;
        this.isActive = isActive;
        this.expiresAt = expiresAt;
        this.user = new User(userId);
        this.applicantUser = new User(applicantUserId);
        this.reportCategory = new ReportCategory(reportCategoryId);
        this.restrictionCategory = new RestrictionCategory(restrictionCategoryId);
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

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getApplicantUser() {
        return applicantUser;
    }

    public void setApplicantUser(User applicantUser) {
        this.applicantUser = applicantUser;
    }

    public ReportCategory getRestrictionCategory() {
        return reportCategory;
    }

    public void setRestrictionCategory(ReportCategory reportCategory) {
        this.reportCategory = reportCategory;
    }

    public ReportCategory getReportCategory() {
        return reportCategory;
    }

    public void setReportCategory(ReportCategory reportCategory) {
        this.reportCategory = reportCategory;
    }

    public void setRestrictionCategory(RestrictionCategory restrictionCategory) {
        this.restrictionCategory = restrictionCategory;
    }
}
