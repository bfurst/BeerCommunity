package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.Country;

public interface CountryRepository extends CrudRepository<Country, Integer> {

    @SuppressWarnings("null")
    @Query(value = "SELECT * FROM countries ORDER BY name", nativeQuery = true)
    public Iterable<Country> findAll();
}
