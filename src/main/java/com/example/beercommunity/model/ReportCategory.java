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
@Table(name = "report_categories")
public class ReportCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 255, nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "reportCategory")
    private Set<Report> reports;

    @JsonIgnore
    @OneToMany(mappedBy = "reportCategory")
    private Set<Restriction> restrictions;

    public ReportCategory() {

    }

    public ReportCategory(Integer id) {
        this.id = id;
    }

    public ReportCategory(String name) {
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


    public Set<Report> getReports() {
        return reports;
    }


    public void setReports(Set<Report> reports) {
        this.reports = reports;
    }

    public Set<Restriction> getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(Set<Restriction> restrictions) {
        this.restrictions = restrictions;
    }
}
