package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.RestrictionCategory;

public interface RestrictionCategoryRepository extends CrudRepository<RestrictionCategory, Integer> {

    @SuppressWarnings("null")
    @Query(value = "SELECT * FROM restriction_categories ORDER BY id", nativeQuery = true)
    public Iterable<RestrictionCategory> findAll();
}
