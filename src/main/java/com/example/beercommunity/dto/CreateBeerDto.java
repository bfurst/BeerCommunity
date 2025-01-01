package com.example.beercommunity.dto;

import java.math.BigDecimal;

public class CreateBeerDto {

    private String name;

    private String image;

    private BigDecimal alcoholPercentage;

    private String description;

    private Integer yearIntroduced;

    private Boolean isAvailable;

    private Integer breweryId;

    private Integer shadeId;

    private Integer categoryId;

    public CreateBeerDto() {

    }

    public CreateBeerDto(String name, String image, BigDecimal alcoholPercentage, String description,
            Integer yearIntroduced, Boolean isAvailable, Integer breweryId, Integer shadeId, Integer categoryId) {
        this.name = name;
        this.image = image;
        this.alcoholPercentage = alcoholPercentage;
        this.description = description;
        this.yearIntroduced = yearIntroduced;
        this.isAvailable = isAvailable;
        this.breweryId = breweryId;
        this.shadeId = shadeId;
        this.categoryId = categoryId;
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

    public Integer getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(Integer breweryId) {
        this.breweryId = breweryId;
    }

    public Integer getShadeId() {
        return shadeId;
    }

    public void setShadeId(Integer shadeId) {
        this.shadeId = shadeId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
}
