package com.example.beercommunity.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "beer_categories")
public class BeerCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255, nullable = false, unique = true)
    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "beerCategory")
    private Set<Beer> beers;

    public BeerCategory() {

    }

    public BeerCategory(Integer id) {
        this.id = id;
    }

    public BeerCategory(String name) {
        this.name = name;
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


    public Set<Beer> getBeers() {
        return beers;
    }


    public void setBeers(Set<Beer> beers) {
        this.beers = beers;
    }
}
