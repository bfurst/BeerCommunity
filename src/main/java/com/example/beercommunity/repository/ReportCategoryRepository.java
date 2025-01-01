package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.ReportCategory;

public interface ReportCategoryRepository extends CrudRepository<ReportCategory, Integer> {

    @SuppressWarnings("null")
    @Query(value = "SELECT * FROM report_categories ORDER BY id", nativeQuery = true)
    public Iterable<ReportCategory> findAll();
}
