package com.example.beercommunity.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "restriction_categories")
public class RestrictionCategory {

    @Id
    private Integer id;

    @Column(length = 255, nullable = false)
    private String name;

    @Column(nullable = true)
    private Integer duration;

    @JsonIgnore
    @OneToMany(mappedBy = "restrictionCategory")
    private Set<Restriction> restrictions;

    public RestrictionCategory() {

    }

    public RestrictionCategory(Integer id) {
        this.id = id;
    }

    public RestrictionCategory(Integer id, String name, Integer duration) {
        this.id = id;
        this.name = name;
        this.duration = duration;
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Set<Restriction> getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(Set<Restriction> restrictions) {
        this.restrictions = restrictions;
    }

    
}
