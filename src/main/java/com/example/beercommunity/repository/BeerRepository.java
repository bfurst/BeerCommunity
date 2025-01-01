package com.example.beercommunity.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.beercommunity.model.Beer;

@Repository
public interface BeerRepository extends CrudRepository<Beer, Integer> {

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Beer> findAllByReports(Integer id, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByReportsAndCategory(Integer id, Integer category, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1 AND beer_shade_id = ?2
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByReportsAndShade(Integer id, Integer shade, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2 AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByReports(Integer id, Integer category, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1 AND name LIKE %?2%
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByReports(Integer id, String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByReportsAndCategory(Integer id, String search, Integer category, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByReportsAndShade(Integer id, String search, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reports.review_id) as reports_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3 AND beer_shade_id = ?4
                        GROUP BY beers.id
                        ORDER BY reports_count DESC, created_at DESC
                        LIMIT ?5
                        OFFSET ?6""", nativeQuery = true)
        public Iterable<Beer> findAllByReports(Integer id, String search, Integer category, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE user_id = ?1
                        GROUP BY beers.id
                        ORDER BY name
                        """, nativeQuery = true)
        public Iterable<Beer> findAllFavorites(String userId);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?2
                        OFFSET ?3
                        """, nativeQuery = true)
        public Iterable<Beer> findAllFavorites(Integer id, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllFavoritesByCategory(Integer id, Integer category, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1 AND beer_shade_id = ?2
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllFavoritesByShade(Integer id, Integer shade, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2 AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllFavorites(Integer id, Integer category, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2%
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllFavorites(Integer id, String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllFavoritesByCategory(Integer id, String search, Integer category, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllFavoritesByShade(Integer id, String search, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(favorites.beer_id) AS favorites_count FROM beers
                        LEFT JOIN favorites ON beers.id = favorites.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND AND beer_category_id = ?3 AND beer_shade_id = ?4
                        GROUP BY beers.id
                        ORDER BY favorites_count DESC, created_at DESC
                        LIMIT ?5
                        OFFSET ?6""", nativeQuery = true)
        public Iterable<Beer> findAllFavorites(Integer id, String search, Integer category, Integer shade,
                        Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1
                        ORDER BY created_at DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Beer> findAllNewest(Integer id, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND beer_category_id = ?2
                        ORDER BY created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllNewestByCategory(Integer id, Integer category, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND beer_shade_id = ?2
                        ORDER BY created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllNewestByShade(Integer id, Integer shade, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND beer_category_id = ?2 AND beer_shade_id = ?3
                        ORDER BY created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllNewest(Integer id, Integer category, Integer shade, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2%
                        ORDER BY created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllNewest(Integer id, String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3
                        ORDER BY created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllNewestByCategory(Integer id, String search, Integer category, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3
                        ORDER BY created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllNewestByShade(Integer id, String search, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3 AND beer_shade_id = ?4
                        ORDER BY created_at DESC
                        LIMIT ?5
                        OFFSET ?6""", nativeQuery = true)
        public Iterable<Beer> findAllNewest(Integer id, String search, Integer category, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
                        ORDER BY RAND(), name
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Beer> findRandomNewest();

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1
                        ORDER BY name
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabetically(Integer id, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND beer_category_id = ?2
                        ORDER BY name
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabeticallyByCategory(Integer id, Integer category, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND beer_shade_id = ?2
                        ORDER BY name
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabeticallyByShade(Integer id, Integer shade, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND beer_category_id = ?2 AND beer_shade_id = ?3
                        ORDER BY name
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabetically(Integer id, Integer category, Integer shade,
                        Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2%
                        ORDER BY name
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabetically(Integer id, String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3
                        ORDER BY name
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabeticallyByCategory(Integer id, String search, Integer category,
                        Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3
                        ORDER BY name
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabeticallyByShade(Integer id, String search, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT * FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3 AND beer_shade_id = ?4
                        ORDER BY name
                        LIMIT ?5
                        OFFSET ?6""", nativeQuery = true)
        public Iterable<Beer> findAllAlphabetically(Integer id, String search, Integer category, Integer shade,
                        Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Beer> findAllByRating(Integer id, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByRatingAndCategory(Integer id, Integer category, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND beer_shade_id = ?2
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByRatingAndShade(Integer id, Integer shade, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2 AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByRating(Integer id, Integer category, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2%
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByRating(Integer id, String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByRatingAndCategory(Integer id, String search, Integer category, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByRatingAndShade(Integer id, String search, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3 AND beer_shade_id = ?4
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT ?5
                        OFFSET ?6""", nativeQuery = true)
        public Iterable<Beer> findAllByRating(Integer id, String search, Integer category, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Beer> findAllByReviews(Integer id, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByReviewsAndCategory(Integer id, Integer category, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND beer_shade_id = ?2
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByReviewsAndShade(Integer id, Integer shade, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND beer_category_id = ?2 AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByReviews(Integer id, Integer category, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2%
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Beer> findAllByReviews(Integer id, String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByReviewsAndCategory(Integer id, String search, Integer category, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?4
                        OFFSET ?5""", nativeQuery = true)
        public Iterable<Beer> findAllByReviewsAndShade(Integer id, String search, Integer shade, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT beers.*, COUNT(reviews.beer_id) AS reviews_count FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3 AND beer_shade_id = ?4
                        GROUP BY beers.id
                        ORDER BY reviews_count DESC, created_at DESC
                        LIMIT ?5
                        OFFSET ?6""", nativeQuery = true)
        public Iterable<Beer> findAllByReviews(Integer id, String search, Integer category, Integer shade,
                        Integer limit, Integer offset);

        @Query(value = """
                        SELECT beers.*, AVG(reviews.rating) as rating FROM beers
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        GROUP BY beers.id
                        ORDER BY rating DESC, created_at DESC
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Beer> findTopRatedBeers();

        @Query(value = """
                        SELECT IFNULL(ROUND(AVG(reviews.rating), 1), 0) as rating FROM beers
                        INNER JOIN reviews ON beers.id = reviews.beer_id
                        WHERE beer_id = ?1""", nativeQuery = true)
        public BigDecimal getBeerRating(Integer beerId);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE brewery_id = ?1""", nativeQuery = true)
        public Integer count(Integer id);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE beer_category_id = ?1""", nativeQuery = true)
        public Integer countByCategory(Integer id, Integer category);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE beer_shade_id = ?1""", nativeQuery = true)
        public Integer countByShade(Integer id, Integer shade);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE beer_shade_id = ?1 AND beer_shade_id = ?2""", nativeQuery = true)
        public Integer count(Integer id, Integer category, Integer shade);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2%""", nativeQuery = true)
        public Integer count(Integer id, String search);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3""", nativeQuery = true)
        public Integer countByCategory(Integer id, String search, Integer category);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_shade_id = ?3""", nativeQuery = true)
        public Integer countByShade(Integer id, String search, Integer shade);

        @Query(value = """
                        SELECT COUNT(*) FROM beers
                        WHERE brewery_id = ?1 AND name LIKE %?2% AND beer_category_id = ?3 AND beer_shade_id = ?4""", nativeQuery = true)
        public Integer count(Integer id, String search, Integer category, Integer shade);
}
