package com.example.beercommunity.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.beercommunity.components.JwtUtil;
import com.example.beercommunity.dto.BeerDto;
import com.example.beercommunity.dto.BeersSearchDto;
import com.example.beercommunity.dto.BreweriesSearchDto;
import com.example.beercommunity.dto.BreweryDto;
import com.example.beercommunity.dto.CreateReviewDto;
import com.example.beercommunity.dto.EmptyJsonResponse;
import com.example.beercommunity.dto.GetNewsDto;
import com.example.beercommunity.dto.ReportDto;
import com.example.beercommunity.dto.ReviewResponseDto;
import com.example.beercommunity.dto.ReviewsCountDto;
import com.example.beercommunity.exception.CustomExceptions;
import com.example.beercommunity.model.Beer;
import com.example.beercommunity.model.BeerCategory;
import com.example.beercommunity.model.BeerShade;
import com.example.beercommunity.model.Brewery;
import com.example.beercommunity.model.Country;
import com.example.beercommunity.model.News;
import com.example.beercommunity.model.Report;
import com.example.beercommunity.model.ReportCategory;
import com.example.beercommunity.model.Review;
import com.example.beercommunity.model.User;
import com.example.beercommunity.model.Vote;
import com.example.beercommunity.service.AccountManagementService;
import com.example.beercommunity.service.FuncService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/func")
@CrossOrigin(origins = "https://localhost:3000", exposedHeaders = "Data-Counter")
public class DefaultController {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private FuncService funcService;

    @Autowired
    private AccountManagementService accountManagementService;

    @RequestMapping(value = "/news", method = RequestMethod.GET)
    public ResponseEntity<Iterable<News>> getNews(GetNewsDto getNewsDto) {
        Iterable<News> news = funcService.getNews(getNewsDto.getPage(), getNewsDto.getSearch());
        Integer newsCounter = funcService.countNews(getNewsDto.getSearch());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Data-Counter", newsCounter.toString());

        return ResponseEntity.ok()
                .headers(httpHeaders)
                .body(news);

    }

    @RequestMapping(value = "/countries", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Country>> getCountries() {

        Iterable<Country> countries = funcService.getCountries();

        return ResponseEntity.ok().body(countries);
    }

    @RequestMapping(value = "/breweries/{id}", method = RequestMethod.GET)
    public ResponseEntity<Brewery> getBrewery(@PathVariable Integer id)
            throws CustomExceptions.ResourceNotFoundException {
        Optional<Brewery> brewery = funcService.getBrewery(id);

        if (brewery.isEmpty())
            throw new CustomExceptions.ResourceNotFoundException();

        return ResponseEntity.ok(brewery.get());
    }

    @RequestMapping(value = "/breweries", method = RequestMethod.GET)
    public ResponseEntity<String> getBreweries(BreweriesSearchDto breweriesSearchDto) throws JsonProcessingException {

        Iterable<Brewery> breweries = funcService.getBreweries(breweriesSearchDto.getPage(),
                breweriesSearchDto.getSearch(), breweriesSearchDto.getFilter(), breweriesSearchDto.getCountry());
        Integer breweriesCounter = funcService.countBreweries(breweriesSearchDto.getSearch(),
                breweriesSearchDto.getCountry());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Data-Counter", breweriesCounter.toString());

        List<BreweryDto> breweriesData = new ArrayList<>();
        breweries.forEach(brewery -> {
            BigDecimal breweryRating = funcService.getBreweryRating(brewery.getId());
            Integer numberOfReviews = funcService.countBreweryReviews(brewery.getId());

            BreweryDto breweryDto = new BreweryDto(
                    brewery.getId(), brewery.getName(), brewery.getDescription(), brewery.getYearFounded(),
                    brewery.getUrl(), brewery.getImage(), breweryRating, numberOfReviews, brewery.getBeers().size(),
                    brewery.getCreatedAt(), brewery.getUpdatedAt(), brewery.getCountry().getId());

            breweriesData.add(breweryDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAllExcept("numberOfReports"));

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(breweriesData);

        return ResponseEntity.ok()
                .headers(httpHeaders)
                .body(jsonResponse);
    }

    @RequestMapping(value = "/breweries/top", method = RequestMethod.GET)
    public ResponseEntity<String> getTopRatedBreweries(BreweriesSearchDto breweriesSearchDto)
            throws JsonProcessingException {

        Iterable<Brewery> breweries = funcService.getTopRatedBreweries();

        List<BreweryDto> breweriesData = new ArrayList<>();
        breweries.forEach(brewery -> {
            BigDecimal breweryRating = funcService.getBreweryRating(brewery.getId());
            Integer numberOfReviews = funcService.countBreweryReviews(brewery.getId());

            BreweryDto breweryDto = new BreweryDto(
                    brewery.getId(), brewery.getName(), brewery.getDescription(), brewery.getYearFounded(),
                    brewery.getUrl(), brewery.getImage(), breweryRating, numberOfReviews, brewery.getBeers().size(),
                    brewery.getCreatedAt(), brewery.getUpdatedAt(), brewery.getCountry().getId());

            breweriesData.add(breweryDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAllExcept("numberOfReports"));

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(breweriesData);

        return ResponseEntity.ok(jsonResponse);
    }

    @RequestMapping(value = "/beer-categories", method = RequestMethod.GET)
    public ResponseEntity<Iterable<BeerCategory>> getBeerCategories() {

        Iterable<BeerCategory> beerCategories = funcService.getBeerCategories();

        return ResponseEntity.ok(beerCategories);
    }

    @RequestMapping(value = "/beer-shades", method = RequestMethod.GET)
    public ResponseEntity<Iterable<BeerShade>> getBeerShades() {

        Iterable<BeerShade> beerShades = funcService.getBeerShades();

        return ResponseEntity.ok(beerShades);
    }

    @RequestMapping(value = "/breweries/beers/new", method = RequestMethod.GET)
    public ResponseEntity<String> getRandomNewBeers() throws JsonProcessingException {

        Iterable<Beer> beers = funcService.getRandomNewBeers();
        List<BeerDto> beersData = new ArrayList<>();
        beers.forEach(beer -> {
            BigDecimal beerRating = funcService.getBeerRating(beer.getId());

            BeerDto beerDto = new BeerDto(beer.getId(), beer.getName(), beer.getImage(),
                    beer.getAlcoholPercentage(), beer.getDescription(), beer.getYearIntroduced(),
                    beer.getIsAvailable(), beerRating, beer.getReviews().size(),
                    false, beer.getCreatedAt(), beer.getUpdatedAt(),
                    beer.getBeerCategory().getId(), beer.getBeerShade().getId());

            beersData.add(beerDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAllExcept("numberOfReports"));

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(beersData);

        return ResponseEntity.ok(jsonResponse);
    }

    @RequestMapping(value = "/beers", method = RequestMethod.GET)
    public ResponseEntity<String> getBeers(HttpServletRequest httpServletRequest,
            BeersSearchDto beersSearchDto) throws JsonProcessingException {

        User user = getUserFromJwtToken(httpServletRequest);

        Iterable<Integer> favorites = funcService.getFavorites(user.getId(), beersSearchDto.getBreweryId());
        List<Integer> beerIds = StreamSupport.stream(favorites.spliterator(), false)
                .collect(Collectors.toList());

        Iterable<Beer> beers = funcService.getBeers(beersSearchDto.getBreweryId(), beersSearchDto.getPage(),
                beersSearchDto.getSearch(), beersSearchDto.getFilter(), beersSearchDto.getCategory(),
                beersSearchDto.getShade());
        Integer beersCounter = funcService.countBeers(beersSearchDto.getBreweryId(), beersSearchDto.getSearch(),
                beersSearchDto.getCategory(), beersSearchDto.getShade());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Data-Counter", beersCounter.toString());

        List<BeerDto> beersData = new ArrayList<>();
        beers.forEach(beer -> {
            BigDecimal beerRating = funcService.getBeerRating(beer.getId());

            BeerDto beerDto = new BeerDto(beer.getId(), beer.getName(), beer.getImage(),
                    beer.getAlcoholPercentage(), beer.getDescription(), beer.getYearIntroduced(),
                    beer.getIsAvailable(), beerRating, beer.getReviews().size(),
                    beerIds.contains(beer.getId()), beer.getCreatedAt(), beer.getUpdatedAt(),
                    beer.getBeerCategory().getId(), beer.getBeerShade().getId());

            beersData.add(beerDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAllExcept("numberOfReports"));

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(beersData);
        return ResponseEntity.ok()
                .headers(httpHeaders)
                .body(jsonResponse);
    }

    @RequestMapping(value = "/breweries/beers/top", method = RequestMethod.GET)
    public ResponseEntity<String> getTopRatedBeers() throws JsonProcessingException {

        Iterable<Beer> beers = funcService.getTopRatedBeers();

        List<BeerDto> beersData = new ArrayList<>();
        beers.forEach(beer -> {
            BigDecimal beerRating = funcService.getBeerRating(beer.getId());

            BeerDto beerDto = new BeerDto(beer.getId(), beer.getName(), beer.getImage(),
                    beer.getAlcoholPercentage(), beer.getDescription(), beer.getYearIntroduced(),
                    beer.getIsAvailable(), beerRating, beer.getReviews().size(),
                    false, beer.getCreatedAt(), beer.getUpdatedAt(),
                    beer.getBeerCategory().getId(), beer.getBeerShade().getId());

            beersData.add(beerDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAllExcept("numberOfReports"));

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(beersData);

        return ResponseEntity.ok(jsonResponse);
    }

    @RequestMapping(value = "/favorites", method = RequestMethod.GET)
    public ResponseEntity<String> getFavorites(HttpServletRequest httpServletRequest) throws JsonProcessingException {

        User user = getUserFromJwtToken(httpServletRequest);
        Iterable<Beer> beers = funcService.getFavorites(user.getId());

        List<BeerDto> beersData = new ArrayList<>();
        beers.forEach(beer -> {
            BigDecimal beerRating = funcService.getBeerRating(beer.getId());

            BeerDto beerDto = new BeerDto(beer.getId(), beer.getName(), beer.getImage(),
                    beer.getAlcoholPercentage(), beer.getDescription(), beer.getYearIntroduced(),
                    beer.getIsAvailable(), beerRating, beer.getReviews().size(),
                    true, beer.getCreatedAt(), beer.getUpdatedAt(),
                    beer.getBeerCategory().getId(), beer.getBeerShade().getId());

            beersData.add(beerDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAllExcept("numberOfReports"));

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(beersData);

        return ResponseEntity.ok(jsonResponse);
    }

    @RequestMapping(value = "/favorite", method = RequestMethod.POST)
    public ResponseEntity<EmptyJsonResponse> addFavoriteBeer(HttpServletRequest httpServletRequest,
            @RequestParam Integer id) {

        User user = getUserFromJwtToken(httpServletRequest);
        funcService.addFavorite(user.getId(), id);

        return ResponseEntity.ok(new EmptyJsonResponse());
    }

    @RequestMapping(value = "/favorite", method = RequestMethod.DELETE)
    public ResponseEntity<EmptyJsonResponse> removeFavoriteBeer(HttpServletRequest httpServletRequest,
            @RequestParam Integer id) {

        User user = getUserFromJwtToken(httpServletRequest);
        funcService.removeFavorite(user, id);

        return ResponseEntity.ok(new EmptyJsonResponse());
    }

    @RequestMapping(value = "/reviews/count", method = RequestMethod.GET)
    public ResponseEntity<ReviewsCountDto> countReviews(HttpServletRequest httpServletRequest) {

        User user = getUserFromJwtToken(httpServletRequest);
        Integer reviewsCount = funcService.countReviews(user.getId());
        ReviewsCountDto reviewsCountDto = new ReviewsCountDto(user.getUsername(), reviewsCount);

        return ResponseEntity.ok(reviewsCountDto);
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.GET)
    public ResponseEntity<String> getReviews(HttpServletRequest httpServletRequest, Integer id,
            String filter) throws JsonProcessingException {

        User user = getUserFromJwtToken(httpServletRequest);
        Iterable<ReviewResponseDto> reviews = funcService.getReviews(user.getId(), id, filter);
        List<ReviewResponseDto> reviewsData = new ArrayList<>();

        reviews.forEach(review -> {
            Optional<Vote> like = funcService.getReviewLike(user.getId(), review.getId());
            Optional<Vote> dislike = funcService.getReviewDislike(user.getId(), review.getId());
            Optional<Report> report = funcService.getReport(user.getId(), review.getId());
            review.setIsLiked(like.isPresent());
            review.setIsDisliked(dislike.isPresent());
            review.setIsReported(report.isPresent());

            reviewsData.add(review);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAllExcept(new String[] { "reviewReports", "userLocked" }));

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(reviewsData);

        return ResponseEntity.ok(jsonResponse);
    }

    @RequestMapping(value = "/reviews/{id}/like", method = RequestMethod.POST)
    public ResponseEntity<Vote> likeReview(HttpServletRequest httpServletRequest,
            @PathVariable Integer id)
            throws CustomExceptions.ConflictException, CustomExceptions.ResourceNotFoundException {

        Optional<Review> review = funcService.getReview(id);

        if (review.isPresent()) {
            User user = getUserFromJwtToken(httpServletRequest);
            Optional<Vote> vote = funcService.getReviewLike(user.getId(), id);
            if (vote.isPresent())
                throw new CustomExceptions.ConflictException();

            Vote newVote = new Vote(user.getId(), id, "Like");
            funcService.createReviewVote(newVote);

            return ResponseEntity.ok(newVote);
        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/reviews/{id}/like", method = RequestMethod.DELETE)
    public ResponseEntity<Void> removeLikeFromReview(HttpServletRequest httpServletRequest,
            @PathVariable Integer id) throws CustomExceptions.ResourceNotFoundException {

        Optional<Review> review = funcService.getReview(id);
        if (review.isPresent()) {
            User user = getUserFromJwtToken(httpServletRequest);
            Optional<Vote> vote = funcService.getReviewLike(user.getId(), id);
            if (vote.isPresent()) {
                funcService.removeReviewLike(vote.get());

                return ResponseEntity.ok().build();
            }
        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/reviews/{id}/dislike", method = RequestMethod.POST)
    public ResponseEntity<Vote> dislikeReview(HttpServletRequest httpServletRequest,
            @PathVariable Integer id)
            throws CustomExceptions.ConflictException, CustomExceptions.ResourceNotFoundException {

        Optional<Review> review = funcService.getReview(id);

        if (review.isPresent()) {
            User user = getUserFromJwtToken(httpServletRequest);
            Optional<Vote> vote = funcService.getReviewDislike(user.getId(), id);
            if (vote.isPresent())
                throw new CustomExceptions.ConflictException();

            Vote newVote = new Vote(user.getId(), id, "Dislike");
            funcService.createReviewVote(newVote);

            return ResponseEntity.ok(newVote);
        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/reviews/{id}/dislike", method = RequestMethod.DELETE)
    public ResponseEntity<Void> removeDislikeFromReview(HttpServletRequest httpServletRequest,
            @PathVariable Integer id) throws CustomExceptions.ResourceNotFoundException {

        Optional<Review> review = funcService.getReview(id);
        if (review.isPresent()) {
            User user = getUserFromJwtToken(httpServletRequest);
            Optional<Vote> vote = funcService.getReviewDislike(user.getId(), id);

            if (vote.isPresent()) {
                funcService.removeReviewLike(vote.get());

                return ResponseEntity.ok().build();
            }
        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/reviews/{id}/report", method = RequestMethod.POST)
    public ResponseEntity<Report> reportReview(HttpServletRequest httpServletRequest,
            @RequestBody ReportDto reportDto)
            throws CustomExceptions.ConflictException, CustomExceptions.ResourceNotFoundException {

        Optional<Review> review = funcService.getReview(reportDto.getReviewId());
        if (review.isPresent()) {
            User user = getUserFromJwtToken(httpServletRequest);
            Optional<Report> existingReport = funcService.getReport(user.getId(), reportDto.getReviewId());

            if (existingReport.isPresent())
                throw new CustomExceptions.ConflictException();

            Report report = new Report(user.getId(), reportDto.getReviewId(), reportDto.getDescription(),
                    reportDto.getCategoryId());
            funcService.createReport(report);

            return ResponseEntity.ok(report);
        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/report-categories", method = RequestMethod.GET)
    public ResponseEntity<Iterable<ReportCategory>> getReportCategories() {

        Iterable<ReportCategory> reportCategories = funcService.getReportCategories();

        return ResponseEntity.ok(reportCategories);
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.POST)
    public ResponseEntity<Review> createReview(HttpServletRequest httpServletRequest,
            @RequestBody CreateReviewDto reviewDto) throws CustomExceptions.ConflictException {

        User user = getUserFromJwtToken(httpServletRequest);
        Optional<Review> review = funcService.getReview(user.getId(), reviewDto.getBeerId());

        if (review.isPresent())
            throw new CustomExceptions.ConflictException();

        Review newReview = new Review(reviewDto.getDescription(), reviewDto.getRating(), user.getId(),
                reviewDto.getBeerId());
        Review createdReview = funcService.createReview(newReview);

        return ResponseEntity.ok(createdReview);
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.PUT)
    public ResponseEntity<Review> updateReview(HttpServletRequest httpServletRequest,
            @RequestBody CreateReviewDto reviewDto) throws CustomExceptions.ResourceNotFoundException {

        User user = getUserFromJwtToken(httpServletRequest);
        Optional<Review> review = funcService.getReview(user.getId(), reviewDto.getBeerId());

        if (!review.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();

        review.get().setRating(reviewDto.getRating());
        review.get().setDescription(reviewDto.getDescription());
        Review updatedReview = funcService.updateReview(review.get());

        return ResponseEntity.ok(updatedReview);
    }

    @RequestMapping(value = "/reviews/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteReview(HttpServletRequest httpServletRequest,
            @PathVariable Integer id)
            throws CustomExceptions.ResourceNotFoundException, CustomExceptions.ForbiddenAccessException {

        User user = getUserFromJwtToken(httpServletRequest);
        Optional<Review> review = funcService.getReview(id);

        if (!review.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();
        else if (review.get().getUser().getId() != user.getId())
            throw new CustomExceptions.ForbiddenAccessException();

        funcService.deleteReview(review.get());

        return ResponseEntity.ok().build();
    }

    private User getUserFromJwtToken(HttpServletRequest httpServletRequest) {
        
        String authHeader = httpServletRequest.getHeader("Authorization");
        String username = JwtUtil.extractUsername(authHeader.substring(7));

        return accountManagementService.getUserByUsername(username).get();
    }
}
