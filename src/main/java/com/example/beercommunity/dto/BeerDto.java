package com.example.beercommunity.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFilter("RoleFilter")
public class BeerDto {

    private Integer id;

    private String name;

    private String image;

    private BigDecimal alcoholPercentage;

    private String description;

    private Integer yearIntroduced;

    private Boolean isAvailable;

    private BigDecimal grade;

    private Integer numberOfReviews;

    private Integer numberOfReports;

    private Boolean isFavorite;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    private Integer categoryId;

    private Integer shadeId;

    public BeerDto() {

    }

    public BeerDto(Integer id, String name, String image, BigDecimal alcoholPercentage, String description,
            Integer yearIntroduced, Boolean isAvailable, BigDecimal grade, Integer numberOfReviews, Boolean isFavorite,
            LocalDateTime createdAt, LocalDateTime updatedAt, Integer categoryId, Integer shadeId) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.alcoholPercentage = alcoholPercentage;
        this.description = description;
        this.yearIntroduced = yearIntroduced;
        this.isAvailable = isAvailable;
        this.grade = grade;
        this.numberOfReviews = numberOfReviews;
        this.isFavorite = isFavorite;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryId = categoryId;
        this.shadeId = shadeId;
    }

    public BeerDto(Integer id, String name, String image, BigDecimal alcoholPercentage, String description,
            Integer yearIntroduced, Boolean isAvailable, BigDecimal grade, Integer numberOfReviews,
            Integer numberOfReports, Boolean isFavorite, LocalDateTime createdAt, LocalDateTime updatedAt,
            Integer categoryId, Integer shadeId) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.alcoholPercentage = alcoholPercentage;
        this.description = description;
        this.yearIntroduced = yearIntroduced;
        this.isAvailable = isAvailable;
        this.grade = grade;
        this.numberOfReviews = numberOfReviews;
        this.numberOfReports = numberOfReports;
        this.isFavorite = isFavorite;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryId = categoryId;
        this.shadeId = shadeId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public BigDecimal getAlcoholPercentage() {
        return alcoholPercentage;
    }

    public void setAlcoholPercentage(BigDecimal alcoholPercentage) {
        this.alcoholPercentage = alcoholPercentage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getYearIntroduced() {
        return yearIntroduced;
    }

    public void setYearIntroduced(Integer yearIntroduced) {
        this.yearIntroduced = yearIntroduced;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public BigDecimal getGrade() {
        return grade;
    }

    public void setGrade(BigDecimal grade) {
        this.grade = grade;
    }

    public Integer getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(Integer numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public Integer getNumberOfReports() {
        return numberOfReports;
    }

    public void setNumberOfReports(Integer numberOfReports) {
        this.numberOfReports = numberOfReports;
    }

    public Boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(Boolean isFavorite) {
        this.isFavorite = isFavorite;
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

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getShadeId() {
        return shadeId;
    }

    public void setShadeId(Integer shadeId) {
        this.shadeId = shadeId;
    }
}
