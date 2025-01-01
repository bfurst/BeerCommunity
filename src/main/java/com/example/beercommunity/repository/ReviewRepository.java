package com.example.beercommunity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.Review;

public interface ReviewRepository extends CrudRepository<Review, Integer> {

        @Query(value = "SELECT * FROM reviews WHERE user_id = ?1 AND beer_id = ?2 LIMIT 1", nativeQuery = true)
        public Optional<Review> getReview(String userId, Integer beerId);

        @Query(value = """
                        SELECT review_id, description, rating, likes, dislikes, reviewer_id, reviewer_username, reviewer_profile_image, reviewer_account_deleted, beer_id, created_at FROM reviews_filtered
                        WHERE beer_id = ?2
                        ORDER BY IF(reviewer_id = ?1, 0, 1), reports_number DESC
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Object[]> getReviewsByReports(String userId, Integer beerId);

        @Query(value = """
                        SELECT review_id, description, rating, likes, dislikes, reviewer_id, reviewer_username, reviewer_profile_image, reviewer_account_deleted, beer_id, created_at FROM reviews_filtered
                        WHERE beer_id = ?2
                        ORDER BY IF(reviewer_id = ?1, 0, 1), created_at DESC
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Object[]> getNewestReviews(String userId, Integer beerId);

        @Query(value = """
                        SELECT review_id, description, rating, likes, dislikes, reviewer_id, reviewer_username, reviewer_profile_image, reviewer_account_deleted, beer_id, created_at FROM reviews_filtered
                        WHERE beer_id = ?2
                        ORDER BY IF(reviewer_id = ?1, 0, 1), likes DESC
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Object[]> getPopularReviews(String userId, Integer beerId);

        @Query(value = """
                        SELECT review_id, description, rating, likes, dislikes, reviewer_id, reviewer_username, reviewer_profile_image, reviewer_account_deleted, beer_id, created_at FROM reviews_filtered
                        WHERE beer_id = ?2
                        ORDER BY IF(reviewer_id = ?1, 0, 1), rating DESC
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Object[]> getHighestRatedReviews(String userId, Integer beerId);

        @Query(value = """
                        SELECT review_id, description, rating, likes, dislikes, reviewer_id, reviewer_username, reviewer_profile_image, reviewer_account_deleted, beer_id, created_at FROM reviews_filtered
                        WHERE beer_id = ?2
                        ORDER BY IF(reviewer_id = ?1, 0, 1), rating
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Object[]> getLowestRatedReviews(String userId, Integer beerId);

        @Query(value = """
                        SELECT COUNT(*) FROM reviews
                        WHERE user_id = ?1""", nativeQuery = true)
        public Integer countReviews(String userId);

        @Query(value = """
                        SELECT COUNT(*) FROM reviews
                        INNER JOIN reports ON reviews.id = reports.review_id
                        WHERE beer_id = ?1""", nativeQuery = true)
        public Integer countReportedReviews(Integer beerId);
}
