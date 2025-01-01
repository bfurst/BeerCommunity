package com.example.beercommunity.dto;

import java.math.BigDecimal;

public class UpdateBeerDto {

    private Integer id;

    private String name;

    private String image;

    private BigDecimal alcoholPercentage;

    private String description;

    private Integer yearIntroduced;

    private Boolean isAvailable;

    private Integer categoryId;

    private Integer shadeId;

    public UpdateBeerDto() {

    }

    public UpdateBeerDto(Integer id, String name, String image, BigDecimal alcoholPercentage, String description,
            Integer yearIntroduced, Boolean isAvailable, Integer categoryId, Integer shadeId) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.alcoholPercentage = alcoholPercentage;
        this.description = description;
        this.yearIntroduced = yearIntroduced;
        this.isAvailable = isAvailable;
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
