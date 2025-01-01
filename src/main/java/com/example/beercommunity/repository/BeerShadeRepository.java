package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.BeerShade;

public interface BeerShadeRepository extends CrudRepository<BeerShade, Integer> {

    @SuppressWarnings("null")
    @Query(value = "SELECT * FROM beer_shades ORDER BY shade", nativeQuery = true)
    public Iterable<BeerShade> findAll();
}
