package com.example.beercommunity.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFilter("RoleFilter")
public class BreweryDto {

    private Integer id;

    private String name;

    private String description;

    private Integer yearFounded;

    private String url;

    private String image;

    private BigDecimal grade;

    private Integer numberOfReviews;

    private Integer numberOfReports;

    private Integer availableBeers;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private  LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private  LocalDateTime updatedAt;

    private Integer countryId;

    public BreweryDto() {
        
    }

    public BreweryDto(Integer id, String name, String description, Integer yearFounded, String url, String image,
            BigDecimal grade, Integer numberOfReviews, Integer numberOfReports, Integer availableBeers,
            LocalDateTime createdAt, LocalDateTime updatedAt, Integer countryId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.yearFounded = yearFounded;
        this.url = url;
        this.image = image;
        this.grade = grade;
        this.numberOfReviews = numberOfReviews;
        this.numberOfReports = numberOfReports;
        this.availableBeers = availableBeers;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.countryId = countryId;
    }

    public BreweryDto(Integer id, String name, String description, Integer yearFounded, String url, String image,
            BigDecimal grade, Integer numberOfReviews, Integer availableBeers, LocalDateTime createdAt,
            LocalDateTime updatedAt, Integer countryId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.yearFounded = yearFounded;
        this.url = url;
        this.image = image;
        this.grade = grade;
        this.numberOfReviews = numberOfReviews;
        this.availableBeers = availableBeers;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.countryId = countryId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getYearFounded() {
        return yearFounded;
    }

    public void setYearFounded(Integer yearFounded) {
        this.yearFounded = yearFounded;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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

    public Integer getAvailableBeers() {
        return availableBeers;
    }

    public void setAvailableBeers(Integer availableBeers) {
        this.availableBeers = availableBeers;
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

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }
}
