package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.BeerCategory;

public interface BeerCategoryRepository extends CrudRepository<BeerCategory, Integer> {

    @SuppressWarnings("null")
    @Query(value = "SELECT * FROM beer_categories ORDER BY name", nativeQuery = true)
    public Iterable<BeerCategory> findAll();
}
