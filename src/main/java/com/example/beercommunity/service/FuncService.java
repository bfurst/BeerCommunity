package com.example.beercommunity.service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import com.example.beercommunity.BeerCommunityApplication;
import com.example.beercommunity.dto.ReportResponseDto;
import com.example.beercommunity.dto.ReviewResponseDto;
import com.example.beercommunity.model.Beer;
import com.example.beercommunity.model.BeerCategory;
import com.example.beercommunity.model.BeerShade;
import com.example.beercommunity.model.Brewery;
import com.example.beercommunity.model.Country;
import com.example.beercommunity.model.Favorite;
import com.example.beercommunity.model.News;
import com.example.beercommunity.model.Report;
import com.example.beercommunity.model.ReportCategory;
import com.example.beercommunity.model.ReportId;
import com.example.beercommunity.model.Review;
import com.example.beercommunity.model.User;
import com.example.beercommunity.model.Vote;
import com.example.beercommunity.model.VoteId;
import com.example.beercommunity.repository.BeerCategoryRepository;
import com.example.beercommunity.repository.BeerRepository;
import com.example.beercommunity.repository.BeerShadeRepository;
import com.example.beercommunity.repository.BreweryRepository;
import com.example.beercommunity.repository.CountryRepository;
import com.example.beercommunity.repository.FavoriteRepository;
import com.example.beercommunity.repository.NewsRepository;
import com.example.beercommunity.repository.ReportCategoryRepository;
import com.example.beercommunity.repository.ReportRepository;
import com.example.beercommunity.repository.ReviewRepository;
import com.example.beercommunity.repository.VoteRepository;

@Service
public class FuncService {

    private final NewsRepository newsRepository;

    private final CountryRepository countryRepository;

    private final BreweryRepository brewerieRepository;

    private final BeerRepository beerRepository;

    private final BeerCategoryRepository beerCategoryRepository;

    private final BeerShadeRepository beerShadeRepository;

    private final FavoriteRepository favoriteRepository;

    private final ReviewRepository reviewRepository;

    private final VoteRepository voteRepository;

    private final ReportCategoryRepository reportCategoryRepository;

    private final ReportRepository reportRepository;

    public FuncService(
            NewsRepository newsRepository, CountryRepository countryRepository, BreweryRepository brewerieRepository,
            BeerRepository beerRepository, BeerCategoryRepository beerCategoryRepository,
            BeerShadeRepository beerShadeRepository,
            FavoriteRepository favoriteRepository, ReviewRepository reviewRepository, VoteRepository voteRepository,
            ReportCategoryRepository reportCategoryRepository,
            ReportRepository reportRepository) {
        this.newsRepository = newsRepository;
        this.countryRepository = countryRepository;
        this.brewerieRepository = brewerieRepository;
        this.beerRepository = beerRepository;
        this.beerCategoryRepository = beerCategoryRepository;
        this.beerShadeRepository = beerShadeRepository;
        this.favoriteRepository = favoriteRepository;
        this.reviewRepository = reviewRepository;
        this.voteRepository = voteRepository;
        this.reportCategoryRepository = reportCategoryRepository;
        this.reportRepository = reportRepository;
    }

    public News updateNews(News news) {
        return newsRepository.save(news);
    }

    public Optional<News> getNews(Integer id) {
        return newsRepository.findById(id);
    }

    public Iterable<News> getNews(Integer pageNumber, String searchTerm) {
        Integer offset = (pageNumber - 1) * 5;

        if (searchTerm.isEmpty())
            return newsRepository.getNews(5, offset);

        return newsRepository.getNews(searchTerm.toLowerCase(), 5, offset);
    }

    public Integer countNews(String searchTerm) {

        if (searchTerm.isEmpty())
            return Math.toIntExact(newsRepository.count());

        return newsRepository.countNews(searchTerm);
    }

    public Iterable<Country> getCountries() {
        return countryRepository.findAll();
    }

    public void deleteNews(Integer id) {
        newsRepository.deleteById(id);
    }

    public Brewery updateBrewery(Brewery brewerie) {
        return brewerieRepository.save(brewerie);
    }

    public void deleteBrewery(Integer id) {
        brewerieRepository.deleteById(id);
    }

    public Optional<Brewery> getBrewery(Integer id) {
        return brewerieRepository.findById(id);
    }

    public Iterable<Brewery> getBreweries(Integer pageNumber, String search, String filter, Integer country) {
        Integer offset = (pageNumber - 1) * 12;

        switch (filter) {
            default -> {
                if (search.isEmpty() && country == 0)
                    return brewerieRepository.findAllNewest(12, offset);
                else if (search.isEmpty() && country != 0)
                    return brewerieRepository.findAllNewest(country, 12, offset);
                else if (!search.isEmpty() && country == 0)
                    return brewerieRepository.findAllNewest(search, 12, offset);
                else
                    return brewerieRepository.findAllNewest(search, country, 12, offset);
            }
            case "reports" -> {
                if (search.isEmpty() && country == 0)
                    return brewerieRepository.findAllByReports(12, offset);
                else if (search.isEmpty() && country != 0)
                    return brewerieRepository.findAllByReports(country, 12, offset);
                else if (!search.isEmpty() && country == 0)
                    return brewerieRepository.findAllByReports(search, 12, offset);
                else
                    return brewerieRepository.findAllByReports(search, country, 12, offset);
            }
            case "alphabetically" -> {
                if (search.isEmpty() && country == 0)
                    return brewerieRepository.findAllAlphabetically(12, offset);
                else if (search.isEmpty() && country != 0)
                    return brewerieRepository.findAllAlphabetically(country, 12, offset);
                else if (!search.isEmpty() && country == 0)
                    return brewerieRepository.findAllAlphabetically(search, 12, offset);
                else
                    return brewerieRepository.findAllAlphabetically(search, country, 12, offset);
            }
            case "rating" -> {
                if (search.isEmpty() && country == 0)
                    return brewerieRepository.findAllByRating(12, offset);
                else if (search.isEmpty() && country != 0)
                    return brewerieRepository.findAllByRating(country, 12, offset);
                else if (!search.isEmpty() && country == 0)
                    return brewerieRepository.findAllByRating(search, 12, offset);
                else
                    return brewerieRepository.findAllByRating(search, country, 12, offset);
            }
            case "reviews" -> {
                if (search.isEmpty() && country == 0)
                    return brewerieRepository.findAllByReviews(12, offset);
                else if (search.isEmpty() && country != 0)
                    return brewerieRepository.findAllByReviews(country, 12, offset);
                else if (!search.isEmpty() && country == 0)
                    return brewerieRepository.findAllByReviews(search, 12, offset);
                else
                    return brewerieRepository.findAllByReviews(search, country, 12, offset);
            }
        }

    }

    public Iterable<Brewery> getTopRatedBreweries() {
        return brewerieRepository.findTopRatedBreweries();
    }

    public BigDecimal getBreweryRating(Integer breweryId) {
        return brewerieRepository.getBreweryRating(breweryId);
    }

    public Integer countBreweries(String search, Integer country) {
        if (search.isEmpty() && country == 0)
            return (int) brewerieRepository.count();
        else if (country != 0)
            return brewerieRepository.count(country);
        else
            return brewerieRepository.count(search);
    }

    public Integer countBreweryReviews(Integer breweryId) {
        return brewerieRepository.countReviews(breweryId);
    }

    public Integer countBreweryReports(Integer breweryId) {
        return brewerieRepository.countReportedReviews(breweryId);
    }

    public Beer updateBeer(Beer beer) {
        return beerRepository.save(beer);
    }

    public Optional<Beer> getBeer(Integer id) {
        return beerRepository.findById(id);
    }

    public void deleteBeer(Integer id) {
        beerRepository.deleteById(id);
    }

    public BigDecimal getBeerRating(Integer beerId) {
        return beerRepository.getBeerRating(beerId);
    }

    public Iterable<BeerCategory> getBeerCategories() {
        return beerCategoryRepository.findAll();
    }

    public Iterable<BeerShade> getBeerShades() {
        return beerShadeRepository.findAll();
    }

    public Iterable<Beer> getBeers(Integer brewerieId, Integer pageNumber, String search, String filter,
            Integer category, Integer shade) {
        Integer offset = (pageNumber - 1) * 12;

        switch (filter) {
            default -> {
                if (search.isEmpty() && category == 0 && shade == 0)
                    return beerRepository.findAllFavorites(brewerieId, 12, offset);
                else if (search.isEmpty() && shade == 0)
                    return beerRepository.findAllFavoritesByCategory(brewerieId, category, 12, offset);
                else if (search.isEmpty() && category == 0)
                    return beerRepository.findAllFavoritesByShade(brewerieId, shade, 12, offset);
                else if (search.isEmpty())
                    return beerRepository.findAllFavorites(brewerieId, category, shade, 12, offset);
                else if (category == 0 && shade == 0)
                    return beerRepository.findAllFavorites(brewerieId, search, 12, offset);
                else if (category == 0)
                    return beerRepository.findAllFavoritesByShade(brewerieId, search, shade, 12, offset);
                else if (shade == 0)
                    return beerRepository.findAllFavoritesByCategory(brewerieId, search, category, 12, offset);
                else
                    return beerRepository.findAllFavorites(brewerieId, search, category, shade, 12, offset);
            }
            case "reports" -> {
                if (search.isEmpty() && category == 0 && shade == 0)
                    return beerRepository.findAllByReports(brewerieId, 12, offset);
                else if (search.isEmpty() && shade == 0)
                    return beerRepository.findAllByReportsAndCategory(brewerieId, category, 12, offset);
                else if (search.isEmpty() && category == 0)
                    return beerRepository.findAllByReportsAndShade(brewerieId, shade, 12, offset);
                else if (search.isEmpty())
                    return beerRepository.findAllByReports(brewerieId, category, shade, 12, offset);
                else if (category == 0 && shade == 0)
                    return beerRepository.findAllByReports(brewerieId, search, 12, offset);
                else if (category == 0)
                    return beerRepository.findAllByReportsAndShade(brewerieId, search, shade, 12, offset);
                else if (shade == 0)
                    return beerRepository.findAllByReportsAndCategory(brewerieId, search, category, 12, offset);
                else
                    return beerRepository.findAllByReports(brewerieId, search, category, shade, 12, offset);
            }
            case "newest" -> {
                if (search.isEmpty() && category == 0 && shade == 0)
                    return beerRepository.findAllNewest(brewerieId, 12, offset);
                else if (search.isEmpty() && shade == 0)
                    return beerRepository.findAllNewestByCategory(brewerieId, category, 12, offset);
                else if (search.isEmpty() && category == 0)
                    return beerRepository.findAllNewestByShade(brewerieId, shade, 12, offset);
                else if (search.isEmpty())
                    return beerRepository.findAllNewest(brewerieId, category, shade, 12, offset);
                else if (category == 0 && shade == 0)
                    return beerRepository.findAllNewest(brewerieId, search, 12, offset);
                else if (category == 0)
                    return beerRepository.findAllNewestByShade(brewerieId, search, shade, 12, offset);
                else if (shade == 0)
                    return beerRepository.findAllNewestByCategory(brewerieId, search, category, 12, offset);
                else
                    return beerRepository.findAllNewest(brewerieId, search, category, shade, 12, offset);
            }

            case "alphabetically" -> {
                if (search.isEmpty() && category == 0 && shade == 0)
                    return beerRepository.findAllAlphabetically(brewerieId, 12, offset);
                else if (search.isEmpty() && shade == 0)
                    return beerRepository.findAllAlphabeticallyByCategory(brewerieId, category, 12, offset);
                else if (search.isEmpty() && category == 0)
                    return beerRepository.findAllAlphabeticallyByShade(brewerieId, shade, 12, offset);
                else if (search.isEmpty())
                    return beerRepository.findAllAlphabetically(brewerieId, category, shade, 12, offset);
                else if (category == 0 && shade == 0)
                    return beerRepository.findAllAlphabetically(brewerieId, search, 12, offset);
                else if (category == 0)
                    return beerRepository.findAllAlphabeticallyByShade(brewerieId, search, shade, 12, offset);
                else if (shade == 0)
                    return beerRepository.findAllAlphabeticallyByCategory(brewerieId, search, category, 12, offset);
                else
                    return beerRepository.findAllAlphabetically(brewerieId, search, category, shade, 12, offset);
            }

            case "rating" -> {
                if (search.isEmpty() && category == 0 && shade == 0)
                    return beerRepository.findAllByRating(brewerieId, 12, offset);
                else if (search.isEmpty() && shade == 0)
                    return beerRepository.findAllByRatingAndCategory(brewerieId, category, 12, offset);
                else if (search.isEmpty() && category == 0)
                    return beerRepository.findAllByRatingAndShade(brewerieId, shade, 12, offset);
                else if (search.isEmpty())
                    return beerRepository.findAllByRating(brewerieId, category, shade, 12, offset);
                else if (category == 0 && shade == 0)
                    return beerRepository.findAllByRating(brewerieId, search, 12, offset);
                else if (category == 0)
                    return beerRepository.findAllByRatingAndShade(brewerieId, search, shade, 12, offset);
                else if (shade == 0)
                    return beerRepository.findAllByRatingAndCategory(brewerieId, search, category, 12, offset);
                else
                    return beerRepository.findAllByRating(brewerieId, search, category, shade, 12, offset);
            }
            case "reviews" -> {
                if (search.isEmpty() && category == 0 && shade == 0)
                    return beerRepository.findAllByReviews(brewerieId, 12, offset);
                else if (search.isEmpty() && shade == 0)
                    return beerRepository.findAllByReviewsAndCategory(brewerieId, category, 12, offset);
                else if (search.isEmpty() && category == 0)
                    return beerRepository.findAllByReviewsAndShade(brewerieId, shade, 12, offset);
                else if (search.isEmpty())
                    return beerRepository.findAllByReviews(brewerieId, category, shade, 12, offset);
                else if (category == 0 && shade == 0)
                    return beerRepository.findAllByReviews(brewerieId, search, 12, offset);
                else if (category == 0)
                    return beerRepository.findAllByReviewsAndShade(brewerieId, search, shade, 12, offset);
                else if (shade == 0)
                    return beerRepository.findAllByReviewsAndCategory(brewerieId, search, category, 12, offset);
                else
                    return beerRepository.findAllByReviews(brewerieId, search, category, shade, 12, offset);
            }
        }
    }

    public Iterable<Beer> getTopRatedBeers() {
        return beerRepository.findTopRatedBeers();
    }

    public Iterable<Beer> getRandomNewBeers() {
        return beerRepository.findRandomNewest();
    }

    public Iterable<Beer> getFavorites(String userId) {
        return beerRepository.findAllFavorites(userId);
    }

    public Integer countBeers(Integer brewerieId, String search, Integer category, Integer shade) {

        if (search.isEmpty() && category == 0 && shade == 0)
            return beerRepository.count(brewerieId);
        else if (search.isEmpty() && shade == 0)
            return beerRepository.countByCategory(brewerieId, category);
        else if (search.isEmpty() && category == 0)
            return beerRepository.countByShade(brewerieId, shade);
        else if (search.isEmpty())
            return beerRepository.count(brewerieId, category, shade);
        else if (category == 0 && shade == 0)
            return beerRepository.count(brewerieId, search);
        else if (category == 0)
            return beerRepository.countByShade(brewerieId, search, shade);
        else if (shade == 0)
            return beerRepository.countByCategory(brewerieId, search, category);
        else
            return beerRepository.count(brewerieId, search, category, shade);
    }

    public Iterable<Integer> getFavorites(String userId, Integer brewerieId) {
        return favoriteRepository.getFavorites(userId, brewerieId);
    }

    public Favorite addFavorite(String userId, Integer beerId) {
        Favorite favorite = new Favorite(userId, beerId);
        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(User user, Integer beerId) {
        Beer beer = new Beer(beerId);
        Favorite favorite = new Favorite(user, beer);
        favoriteRepository.delete(favorite);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Optional<Review> getReview(Integer reviewId) {
        return reviewRepository.findById(reviewId);
    }

    public Optional<Review> getReview(String userId, Integer beerId) {
        return reviewRepository.getReview(userId, beerId);
    }

    public Review updateReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(Review review) {
        reviewRepository.delete(review);
    }

    public Iterable<ReviewResponseDto> getReviews(String userId, Integer beerId, String filter) {
        Iterable<Object[]> results;

        results = switch (filter) {
            case "reports" -> reviewRepository.getReviewsByReports(userId, beerId);
            case "popular" -> reviewRepository.getPopularReviews(userId, beerId);
            case "ratingHigh" -> reviewRepository.getHighestRatedReviews(userId, beerId);
            case "ratingLow" -> reviewRepository.getLowestRatedReviews(userId, beerId);
            default -> reviewRepository.getNewestReviews(userId, beerId);
        };

        return StreamSupport.stream(results.spliterator(), false)
                .map(result -> new ReviewResponseDto(
                        (Integer) result[0],
                        result[1].toString(),
                        (Integer) result[2],
                        ((Long) result[3]).intValue(),
                        ((Long) result[4]).intValue(),
                        result[5].toString(),
                        (Boolean) result[8] ? "anonymous" : result[6].toString(),
                        result[7] == null ? "default-profile.svg" : result[7].toString(),
                        (Boolean) result[8],
                        (Integer) result[9],
                        ((Timestamp) result[10]).toLocalDateTime()))
                .collect(Collectors.toList());
    }

    public Integer countReviews(String userId) {
        return reviewRepository.countReviews(userId);
    }

    public Integer countReportedReviews(Integer beerId) {
        return reviewRepository.countReportedReviews(beerId);
    }

    public Vote createReviewVote(Vote vote) {
        BeerCommunityApplication.logger.info("HELLO " + vote.toString());
        if (vote.getType().equals("Like")) {
            Optional<Vote> dislike = voteRepository.getDislike(vote.getUser().getId(), vote.getReview().getId());
            if (dislike.isPresent())
                voteRepository.delete(dislike.get());
        } else {
            Optional<Vote> like = voteRepository.getLike(vote.getUser().getId(), vote.getReview().getId());
            if (like.isPresent())
                voteRepository.delete(like.get());
        }

        return voteRepository.save(vote);
    }

    public Optional<Vote> getReviewVote(String userId, Integer reviewId) {
        return voteRepository.findById(new VoteId(userId, reviewId));
    }

    public Optional<Vote> getReviewLike(String userId, Integer reviewId) {
        return voteRepository.getLike(userId, reviewId);
    }

    public Optional<Vote> getReviewDislike(String userId, Integer reviewId) {
        return voteRepository.getDislike(userId, reviewId);
    }

    public Integer getReviewLikes(Integer reviewId) {
        return voteRepository.getLikesCount(reviewId);
    }

    public Integer getReviewDislikes(Integer reviewId) {
        return voteRepository.getDislikesCount(reviewId);
    }

    public void removeReviewLike(Vote vote) {
        voteRepository.delete(vote);
    }

    public Iterable<ReportCategory> getReportCategories() {
        return reportCategoryRepository.findAll();
    }

    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    public Optional<Report> getReport(String userId, Integer reviewId) {
        return reportRepository.findById(new ReportId(userId, reviewId));
    }

    public Iterable<ReportResponseDto> getReports(Integer reviewId) {
        Iterable<Object[]> results = reportRepository.getReviewReports(reviewId);

        return StreamSupport.stream(results.spliterator(), false)
                .map(result -> new ReportResponseDto(
                        result[0].toString(),
                        result[1].toString(),
                        result[2].toString()))
                .collect(Collectors.toList());
    }
}
