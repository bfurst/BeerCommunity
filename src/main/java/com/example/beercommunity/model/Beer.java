package com.example.beercommunity.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "beers")
public class Beer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String image;

    @Column(name = "alcohol_percentage", nullable = false)
    private BigDecimal alcoholPercentage;

    @Column(columnDefinition = "text", length = 2000, nullable = false)
    private String description;

    @Column(name = "year_introduced", nullable = false)
    private Integer yearIntroduced;

    @Column(name = "IsAvailable", nullable = false)
    private Boolean isAvailable;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Favorite> favorites;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "brewery_id", nullable = false)
    private Brewery brewery;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "beer_shade_id", nullable = false)
    private BeerShade beerShade;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "beer_category_id", nullable = false)
    private BeerCategory beerCategory;

    public Beer() {

    }

    public Beer(Integer id) {
        this.id = id;
    }

    public Beer(String name, String image, BigDecimal alcoholPercentage, String descrption,
            Integer yearIntroduced, Boolean isAvailable, Brewery brewery, BeerShade beerShade,
            BeerCategory beerCategory) {
        this.name = name;
        this.image = image;
        this.alcoholPercentage = alcoholPercentage;
        this.description = descrption;
        this.yearIntroduced = yearIntroduced;
        this.isAvailable = isAvailable;
        this.brewery = brewery;
        this.beerShade = beerShade;
        this.beerCategory = beerCategory;
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

    public void setDescription(String descrption) {
        this.description = descrption;
    }

    public Integer getYearIntroduced() {
        return yearIntroduced;
    }

    public void setIntroducedIn(Integer yearIntroduced) {
        this.yearIntroduced = yearIntroduced;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
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

    public Set<Favorite> getFavorites() {
        return favorites;
    }

    public void setFavorites(Set<Favorite> favorites) {
        this.favorites = favorites;
    }

    public Brewery getBrewery() {
        return brewery;
    }

    public void setBrewery(Brewery brewery) {
        this.brewery = brewery;
    }

    public BeerShade getBeerShade() {
        return beerShade;
    }

    public void setBeerShade(BeerShade beerShade) {
        this.beerShade = beerShade;
    }

    public BeerCategory getBeerCategory() {
        return beerCategory;
    }

    public void setBeerCategory(BeerCategory beerCategory) {
        this.beerCategory = beerCategory;
    }

    public void setYearIntroduced(Integer yearIntroduced) {
        this.yearIntroduced = yearIntroduced;
    }

    @Override
    public boolean equals(Object obj) {
        Beer beer = (Beer) obj;
        return beer.getId() == id;
    }
}
