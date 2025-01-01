package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.Report;
import com.example.beercommunity.model.ReportId;

public interface ReportRepository extends CrudRepository<Report, ReportId> {

    @Query(value = """
            SELECT users.username, report_categories.name, reports.description FROM reports
            INNER JOIN users ON reports.user_id = users.id
            INNER JOIN reviews ON reports.review_id = reviews.id
            INNER JOIN report_categories ON reports.report_category_id = report_categories.id
            WHERE reviews.id = ?1""", nativeQuery = true)
    public Iterable<Object[]> getReviewReports(Integer reviewId);
}
