package com.example.beercommunity.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.beercommunity.model.Brewery;

@Repository
public interface BreweryRepository extends CrudRepository<Brewery, Integer> {

        @Query(value = """
                        SELECT breweries.*, COUNT(reports.review_id) as reports_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        GROUP BY breweries.id
                        ORDER BY reports_count DESC
                        LIMIT ?1
                        OFFSET ?2""", nativeQuery = true)
        public Iterable<Brewery> findAllByReports(Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, COUNT(reports.review_id) as reports_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE country_id = ?1
                        GROUP BY breweries.id
                        ORDER BY reports_count DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllByReports(Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, COUNT(reports.review_id) as reports_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE breweries.name LIKE %?1%
                        GROUP BY breweries.id
                        ORDER BY reports_count DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllByReports(String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, COUNT(reports.review_id) as reports_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        LEFT JOIN reports ON reviews.id = reports.review_id
                        WHERE breweries.name LIKE %?1% AND country_id = ?2
                        GROUP BY breweries.id
                        ORDER BY reports_count DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Brewery> findAllByReports(String search, Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        ORDER BY created_at DESC
                        LIMIT ?1
                        OFFSET ?2""", nativeQuery = true)
        public Iterable<Brewery> findAllNewest(Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        WHERE country_id = ?1
                        ORDER BY created_at DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllNewest(Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        WHERE name LIKE %?1%
                        ORDER BY created_at DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllNewest(String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        WHERE name LIKE %?1% AND country_id = ?2
                        ORDER BY created_at DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Brewery> findAllNewest(String search, Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        ORDER BY name
                        LIMIT ?1
                        OFFSET ?2""", nativeQuery = true)
        public Iterable<Brewery> findAllAlphabetically(Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        WHERE country_id = ?1
                        ORDER BY name
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllAlphabetically(Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        WHERE name LIKE %?1%
                        ORDER BY name
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllAlphabetically(String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT * FROM breweries
                        WHERE name LIKE %?1% AND country_id = ?2
                        ORDER BY name
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Brewery> findAllAlphabetically(String search, Integer country, Integer limit,
                        Integer offset);

        @Query(value = """
                        SELECT breweries.*, AVG(reviews.rating) as rating FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        GROUP BY breweries.id
                        ORDER BY rating DESC
                        LIMIT ?1
                        OFFSET ?2""", nativeQuery = true)
        public Iterable<Brewery> findAllByRating(Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, AVG(reviews.rating) as rating FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE country_id = ?1
                        GROUP BY breweries.id
                        ORDER BY rating DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllByRating(Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, AVG(reviews.rating) as rating FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE breweries.name LIKE %?1%
                        GROUP BY breweries.id
                        ORDER BY rating DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllByRating(String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, AVG(reviews.rating) as rating FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE breweries.name LIKE %?1% AND country_id = ?2
                        GROUP BY breweries.id
                        ORDER BY rating DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Brewery> findAllByRating(String search, Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, COUNT(reviews.beer_id) as reviews_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        GROUP BY breweries.id
                        ORDER BY reviews_count DESC
                        LIMIT ?1
                        OFFSET ?2""", nativeQuery = true)
        public Iterable<Brewery> findAllByReviews(Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, COUNT(reviews.beer_id) as reviews_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE country_id = ?1
                        GROUP BY breweries.id
                        ORDER BY reviews_count DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllByReviews(Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, COUNT(reviews.beer_id) as reviews_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE breweries.name LIKE %?1%
                        GROUP BY breweries.id
                        ORDER BY reviews_count DESC
                        LIMIT ?2
                        OFFSET ?3""", nativeQuery = true)
        public Iterable<Brewery> findAllByReviews(String search, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, COUNT(reviews.beer_id) as reviews_count FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        WHERE breweries.name LIKE %?1% AND country_id = ?2
                        GROUP BY breweries.id
                        ORDER BY reviews_count DESC
                        LIMIT ?3
                        OFFSET ?4""", nativeQuery = true)
        public Iterable<Brewery> findAllByReviews(String search, Integer country, Integer limit, Integer offset);

        @Query(value = """
                        SELECT breweries.*, AVG(reviews.rating) as rating FROM breweries
                        LEFT JOIN beers ON breweries.id = beers.brewery_id
                        LEFT JOIN reviews ON beers.id = reviews.beer_id
                        GROUP BY breweries.id
                        ORDER BY rating DESC
                        LIMIT 10""", nativeQuery = true)
        public Iterable<Brewery> findTopRatedBreweries();

        @Query(value = """
                        SELECT IFNULL(ROUND(AVG(reviews.rating), 1), 0) as rating FROM breweries
                        INNER JOIN beers ON breweries.id = beers.brewery_id
                        INNER JOIN reviews ON beers.id = reviews.beer_id
                        WHERE brewery_id = ?1""", nativeQuery = true)
        public BigDecimal getBreweryRating(Integer breweryId);

        @Query(value = """
                        SELECT COUNT(*) FROM breweries
                        WHERE name LIKE %?1%""", nativeQuery = true)
        public Integer count(String search);

        @Query(value = """
                        SELECT COUNT(*) FROM breweries
                        WHERE country_id = ?1""", nativeQuery = true)
        public Integer count(Integer country);

        @Query(value = """
                        SELECT COUNT(*) FROM reviews
                        INNER JOIN beers ON beers.id = reviews.beer_id
                        WHERE beers.brewery_id = ?1""", nativeQuery = true)
        public Integer countReviews(Integer breweryId);

        @Query(value = """
                        SELECT COUNT(*) FROM breweries
                        INNER JOIN beers ON breweries.id = beers.brewery_id
                        INNER JOIN reviews ON beers.id = reviews.beer_id
                        INNER JOIN reports ON reviews.id = reports.review_id
                        WHERE brewery_id = ?1""", nativeQuery = true)
        public Integer countReportedReviews(Integer breweryId);
}
