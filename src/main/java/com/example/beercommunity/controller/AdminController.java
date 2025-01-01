package com.example.beercommunity.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.beercommunity.components.JwtUtil;
import com.example.beercommunity.dto.BeerDto;
import com.example.beercommunity.dto.BeersSearchDto;
import com.example.beercommunity.dto.BreweriesSearchDto;
import com.example.beercommunity.dto.BreweryDto;
import com.example.beercommunity.dto.CreateBeerDto;
import com.example.beercommunity.dto.CreateBreweryDto;
import com.example.beercommunity.dto.CreateNewsDto;
import com.example.beercommunity.dto.ReportResponseDto;
import com.example.beercommunity.dto.RestrictionDto;
import com.example.beercommunity.dto.ReviewDeleteDto;
import com.example.beercommunity.dto.ReviewResponseDto;
import com.example.beercommunity.dto.UpdateBeerDto;
import com.example.beercommunity.dto.UpdateBreweryDto;
import com.example.beercommunity.dto.UpdateNewsDto;
import com.example.beercommunity.exception.CustomExceptions;
import com.example.beercommunity.model.Beer;
import com.example.beercommunity.model.BeerCategory;
import com.example.beercommunity.model.BeerShade;
import com.example.beercommunity.model.Brewery;
import com.example.beercommunity.model.Country;
import com.example.beercommunity.model.News;
import com.example.beercommunity.model.Report;
import com.example.beercommunity.model.Restriction;
import com.example.beercommunity.model.RestrictionCategory;
import com.example.beercommunity.model.Review;
import com.example.beercommunity.model.User;
import com.example.beercommunity.model.Vote;
import com.example.beercommunity.service.AccountManagementService;
import com.example.beercommunity.service.EmailService;
import com.example.beercommunity.service.FuncService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/admin")
@CrossOrigin(origins = "https://localhost:3000", exposedHeaders = "Data-Counter")
public class AdminController {

    private final String UPLOADS_NEWS_PATH = "uploads/news/";

    private final String UPLOADS_BREWERY_PATH = "uploads/breweries/";

    private final String UPLOADS_BEER_PATH = "uploads/beers/";

    DateTimeFormatter CUSTOM_FORMATTER = DateTimeFormatter.ofPattern("MM/dd/yyyy hh:mm:ss a");

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private FuncService funcService;

    @Autowired
    private AccountManagementService accountManagementService;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value = "/news", method = RequestMethod.POST)
    public ResponseEntity<News> createNews(HttpServletRequest httpServletRequest,
            @RequestPart("newsData") String newsDataJson, @RequestPart("imageFile") MultipartFile file)
            throws JsonProcessingException, IOException {

        User user = getUserFromJwtToken(httpServletRequest);
        Path uploadPath = Paths.get(UPLOADS_NEWS_PATH);
        ObjectMapper objectMapper = new ObjectMapper();
        CreateNewsDto createNewsDto = objectMapper.readValue(newsDataJson, CreateNewsDto.class);
        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        News news = new News(createNewsDto.getSubject(), createNewsDto.getBody(), fileName, user.getId());
        funcService.updateNews(news);

        return ResponseEntity.ok(news);
    }

    @RequestMapping(value = "/news", method = RequestMethod.PUT)
    public ResponseEntity<News> updateNews(HttpServletRequest httpServletRequest,
            @RequestPart("newsData") String newsDataJson,
            @RequestPart(value = "imageFile", required = false) MultipartFile file)
            throws JsonProcessingException, IOException, CustomExceptions.BadRequestException {

        ObjectMapper objectMapper = new ObjectMapper();
        UpdateNewsDto updateNewsDto = objectMapper.readValue(newsDataJson, UpdateNewsDto.class);
        Optional<News> news = funcService.getNews(updateNewsDto.getId());

        if (news.isEmpty())
            throw new CustomExceptions.BadRequestException();

        if (file != null) {
            Path uploadPath = Paths.get(UPLOADS_NEWS_PATH);
            UUID uuid = UUID.randomUUID();
            String fileName = uuid.toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            Path filePath = uploadPath.resolve(fileName);
            Path oldFilePath = uploadPath.resolve(news.get().getImage());
            Files.delete(oldFilePath);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            news.get().setImage(fileName);
        }

        news.get().setSubject(updateNewsDto.getSubject());
        news.get().setBody(updateNewsDto.getBody());

        News updatedNews = funcService.updateNews(news.get());

        return ResponseEntity.ok(updatedNews);
    }

    @RequestMapping(value = "/news/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteNews(@PathVariable Integer id)
            throws IOException, CustomExceptions.BadRequestException {
        Optional<News> news = funcService.getNews(id);
        if (news.isPresent()) {
            Path path = Paths.get(UPLOADS_NEWS_PATH);
            Files.delete(path.resolve(news.get().getImage()));
            funcService.deleteNews(id);

            return ResponseEntity.ok().build();
        }

        throw new CustomExceptions.BadRequestException();
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
            Integer numberOfReports = funcService.countBreweryReports(brewery.getId());

            BreweryDto breweryDto = new BreweryDto(
                    brewery.getId(), brewery.getName(), brewery.getDescription(), brewery.getYearFounded(),
                    brewery.getUrl(), brewery.getImage(), breweryRating, numberOfReviews, numberOfReports,
                    brewery.getBeers().size(), brewery.getUpdatedAt(), brewery.getCreatedAt(),
                    brewery.getCountry().getId());

            breweriesData.add(breweryDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAll());

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(breweriesData);

        return ResponseEntity.ok()
                .headers(httpHeaders)
                .body(jsonResponse);
    }

    @RequestMapping(value = "/breweries", method = RequestMethod.POST)
    public ResponseEntity<Brewery> createBrewery(HttpServletRequest httpServletRequest,
            @RequestPart("breweryData") String breweryDataJson, @RequestPart("imageFile") MultipartFile file)
            throws JsonProcessingException, IOException {

        Path uploadPath = Paths.get(UPLOADS_BREWERY_PATH);
        ObjectMapper objectMapper = new ObjectMapper();
        CreateBreweryDto createBreweryDto = objectMapper.readValue(breweryDataJson, CreateBreweryDto.class);
        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        Brewery brewery = new Brewery(createBreweryDto.getTitle(), createBreweryDto.getDescription(),
                createBreweryDto.getYearFounded(), createBreweryDto.getUrl(), fileName,
                new Country(createBreweryDto.getCountryId()));
        funcService.updateBrewery(brewery);

        return ResponseEntity.ok(brewery);
    }

    @RequestMapping(value = "/breweries", method = RequestMethod.PUT)
    public ResponseEntity<Brewery> updateBerwery(HttpServletRequest httpServletRequest,
            @RequestPart("breweryData") String breweryDataJson,
            @RequestPart(value = "imageFile", required = false) MultipartFile file)
            throws JsonProcessingException, IOException, CustomExceptions.BadRequestException {

        ObjectMapper objectMapper = new ObjectMapper();
        UpdateBreweryDto updateBreweryDto = objectMapper.readValue(breweryDataJson, UpdateBreweryDto.class);
        Optional<Brewery> brewery = funcService.getBrewery(updateBreweryDto.getId());

        if (brewery.isEmpty())
            throw new CustomExceptions.BadRequestException();

        if (file != null) {
            Path uploadPath = Paths.get(UPLOADS_BREWERY_PATH);
            UUID uuid = UUID.randomUUID();
            String fileName = uuid.toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            Path filePath = uploadPath.resolve(fileName);

            if (!brewery.get().getImage().equals("brewery-default.jpg")) {
                Path oldFilePath = uploadPath.resolve(brewery.get().getImage());
                Files.delete(oldFilePath);
            }

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            brewery.get().setImage(fileName);
        }

        brewery.get().setName(updateBreweryDto.getTitle());
        brewery.get().setDescription(updateBreweryDto.getDescription());
        brewery.get().setUrl(updateBreweryDto.getUrl());
        brewery.get().setYearFounded(updateBreweryDto.getYearFounded());
        brewery.get().setCountry(new Country(updateBreweryDto.getCountryId()));

        Brewery updatedBrewery = funcService.updateBrewery(brewery.get());

        return ResponseEntity.ok(updatedBrewery);
    }

    @RequestMapping(value = "/breweries/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBrewery(@PathVariable Integer id)
            throws IOException, CustomExceptions.BadRequestException {
        Optional<Brewery> brewery = funcService.getBrewery(id);
        if (brewery.isPresent()) {
            Path path = Paths.get(UPLOADS_BREWERY_PATH);
            if (!brewery.get().getImage().equals("brewery-default.jpg"))
                Files.delete(path.resolve(brewery.get().getImage()));

            funcService.deleteBrewery(id);

            return ResponseEntity.ok().build();
        }

        throw new CustomExceptions.BadRequestException();
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
            Integer numberOfReports = funcService.countReportedReviews(beer.getId());
            BigDecimal beerRating = funcService.getBeerRating(beer.getId());

            BeerDto beerDto = new BeerDto(beer.getId(), beer.getName(), beer.getImage(),
                    beer.getAlcoholPercentage(), beer.getDescription(), beer.getYearIntroduced(),
                    beer.getIsAvailable(), beerRating, beer.getReviews().size(), numberOfReports,
                    beerIds.contains(beer.getId()), beer.getCreatedAt(), beer.getUpdatedAt(),
                    beer.getBeerCategory().getId(), beer.getBeerShade().getId());

            beersData.add(beerDto);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAll());

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(beersData);

        return ResponseEntity.ok()
                .headers(httpHeaders)
                .body(jsonResponse);
    }

    @RequestMapping(value = "/breweries/beers", method = RequestMethod.POST)
    public ResponseEntity<Beer> createBeer(HttpServletRequest httpServletRequest,
            @RequestPart("beerData") String beerDataJson, @RequestPart("imageFile") MultipartFile file)
            throws JsonProcessingException, IOException {

        Path uploadPath = Paths.get(UPLOADS_BEER_PATH);
        ObjectMapper objectMapper = new ObjectMapper();
        CreateBeerDto createBeerDto = objectMapper.readValue(beerDataJson, CreateBeerDto.class);
        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        Beer beer = new Beer(createBeerDto.getName(), fileName, createBeerDto.getAlcoholPercentage(),
                createBeerDto.getDescription(), createBeerDto.getYearIntroduced(), createBeerDto.getIsAvailable(),
                new Brewery(createBeerDto.getBreweryId()), new BeerShade(createBeerDto.getShadeId()),
                new BeerCategory(createBeerDto.getCategoryId()));

        funcService.updateBeer(beer);

        return ResponseEntity.ok(beer);
    }

    @RequestMapping(value = "/breweries/beers", method = RequestMethod.PUT)
    public ResponseEntity<Beer> updateBeer(HttpServletRequest httpServletRequest,
            @RequestPart("beerData") String beerDataJson,
            @RequestPart(value = "imageFile", required = false) MultipartFile file)
            throws JsonProcessingException, IOException, CustomExceptions.BadRequestException {

        ObjectMapper objectMapper = new ObjectMapper();
        UpdateBeerDto updateBeerDto = objectMapper.readValue(beerDataJson, UpdateBeerDto.class);
        Optional<Beer> beer = funcService.getBeer(updateBeerDto.getId());

        if (beer.isEmpty())
            throw new CustomExceptions.BadRequestException();

        if (file != null) {
            Path uploadPath = Paths.get(UPLOADS_BEER_PATH);
            UUID uuid = UUID.randomUUID();
            String fileName = uuid.toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            Path filePath = uploadPath.resolve(fileName);

            if (!beer.get().getImage().equals("beer-default.jpg")) {
                Path oldFilePath = uploadPath.resolve(beer.get().getImage());
                Files.delete(oldFilePath);
            }

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            beer.get().setImage(fileName);
        }

        beer.get().setName(updateBeerDto.getName());
        beer.get().setDescription(updateBeerDto.getDescription());
        beer.get().setAlcoholPercentage(updateBeerDto.getAlcoholPercentage());
        beer.get().setIntroducedIn(updateBeerDto.getYearIntroduced());
        beer.get().setIsAvailable(updateBeerDto.getIsAvailable());
        beer.get().setBeerCategory(new BeerCategory(updateBeerDto.getCategoryId()));
        beer.get().setBeerShade(new BeerShade(updateBeerDto.getShadeId()));

        Beer updatedBeer = funcService.updateBeer(beer.get());

        return ResponseEntity.ok(updatedBeer);
    }

    @RequestMapping(value = "/breweries/beers/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteBeers(@PathVariable Integer id)
            throws IOException, CustomExceptions.BadRequestException {

        Optional<Beer> beer = funcService.getBeer(id);
        if (beer.isPresent()) {
            Path path = Paths.get(UPLOADS_BEER_PATH);

            if (!beer.get().getImage().equals("beer-default.jpg"))
                Files.delete(path.resolve(beer.get().getImage()));

            funcService.deleteBeer(id);

            return ResponseEntity.ok().build();
        }

        throw new CustomExceptions.BadRequestException();
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
            Iterable<ReportResponseDto> reports = funcService.getReports(review.getId());
            Optional<Report> report = funcService.getReport(user.getId(), review.getId());
            Boolean hasActiveRestrictions = accountManagementService.hasActiveRestriction(review.getReviewerId());
            review.setIsLiked(like.isPresent());
            review.setIsDisliked(dislike.isPresent());
            review.setReviewReports(reports);
            review.setUserLocked(hasActiveRestrictions);
            review.setIsReported(report.isPresent());

            reviewsData.add(review);
        });

        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("RoleFilter",
                SimpleBeanPropertyFilter.serializeAll());

        String jsonResponse = objectMapper.writer(filterProvider).writeValueAsString(reviewsData);

        return ResponseEntity.ok(jsonResponse);
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.PUT)
    public ResponseEntity<Review> updateReview(@RequestBody Review newReview, HttpServletRequest httpServletRequest)
            throws CustomExceptions.ResourceNotFoundException {

        Optional<Review> review = funcService.getReview(newReview.getId());

        if (!review.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();

        review.get().setRating(newReview.getRating());
        review.get().setDescription(newReview.getDescription());
        Review updatedReview = funcService.updateReview(review.get());

        return ResponseEntity.ok(updatedReview);
    }

    @RequestMapping(value = "/reviews", method = RequestMethod.POST)
    public ResponseEntity<Void> deleteReview(HttpServletRequest httpServletRequest,
            @RequestBody ReviewDeleteDto reviewDeleteDto)
            throws MessagingException, CustomExceptions.ResourceNotFoundException {

        Optional<Review> review = funcService.getReview(reviewDeleteDto.getId());

        if (!review.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();

        User user = review.get().getUser();
        funcService.deleteReview(review.get());
        if (reviewDeleteDto.getNotifyUser()) {
            String postingDate = CUSTOM_FORMATTER.format(review.get().getCreatedAt());
            String emailTemplate = emailService.getReviewDeleteHtmlTemplate(
                    user.getUsername(),
                    review.get().getDescription(),
                    postingDate,
                    reviewDeleteDto.getDescription());

            emailService.sendHtmlMessage(user.getEmail(), "", "Review Deletion Notification", emailTemplate);
        }

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/restriction-categories", method = RequestMethod.GET)
    public ResponseEntity<Iterable<RestrictionCategory>> getRestrictionCategories() {
        Iterable<RestrictionCategory> restrictionCategories = accountManagementService.getRestrictionCategories();

        return ResponseEntity.ok(restrictionCategories);
    }

    @RequestMapping(value = "/restrictions", method = RequestMethod.POST)
    public ResponseEntity<Restriction> createRestriction(@RequestBody RestrictionDto restrictionDto,
            HttpServletRequest httpServletRequest)
            throws MessagingException, CustomExceptions.ResourceNotFoundException, CustomExceptions.ConflictException {

        User user = getUserFromJwtToken(httpServletRequest);
        Optional<User> reportedUser = accountManagementService.getUserById(restrictionDto.getUserId());
        Boolean hasActiveRestriction = accountManagementService.hasActiveRestriction(reportedUser.get().getId());

        if (!reportedUser.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();
        else if (hasActiveRestriction)
            throw new CustomExceptions.ConflictException();

        Optional<RestrictionCategory> restrictionCategory = accountManagementService
                .getRestrictionCategory(restrictionDto.getRestrictionCategoryId());
        LocalDateTime expiresAt;
        if (!restrictionCategory.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();
        else if (restrictionCategory.get().getName().equals("Permanent"))
            expiresAt = LocalDateTime.of(9999, 12, 31, 23, 59, 59);
        else
            expiresAt = LocalDateTime.now().plusDays(restrictionCategory.get().getDuration());

        Restriction restriction = new Restriction(
                restrictionDto.getDescription(),
                true,
                expiresAt,
                restrictionDto.getUserId(),
                user.getId(),
                restrictionDto.getReportCategoryId(),
                restrictionDto.getRestrictionCategoryId());

        Restriction newRestriction = accountManagementService.updateRestriction(restriction);

        String creationDate = CUSTOM_FORMATTER.format(restriction.getCreatedAt());
        String expireDate = CUSTOM_FORMATTER.format(restriction.getExpiresAt());

        String emailTemplate;
        if (restrictionCategory.get().getName().equals("Permanent"))
            emailTemplate = emailService.getPermanentRestrictionHtmlTemplate(
                    reportedUser.get().getUsername(),
                    restriction.getDescription());
        else
            emailTemplate = emailService.getRestrictionHtmlTemplate(
                    reportedUser.get().getUsername(),
                    restriction.getDescription(),
                    creationDate,
                    expireDate);

        emailService.sendHtmlMessage(reportedUser.get().getEmail(), "", "Account Restriction Notification",
                emailTemplate);

        return ResponseEntity.ok(newRestriction);
    }

    @RequestMapping(value = "/unlock-user/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Void> unlockUser(@PathVariable String id)
            throws MessagingException, CustomExceptions.ResourceNotFoundException {

        Optional<Restriction> restriction = accountManagementService.getActiveRestriction(id);
        Optional<User> user = accountManagementService.getUserById(id);

        if (!restriction.isPresent() || !user.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();

        restriction.get().setIsActive(false);
        accountManagementService.updateRestriction(restriction.get());

        String emailTemplate = emailService.getAccountReactivationHtmlTemplate(user.get().getUsername());
        emailService.sendHtmlMessage(user.get().getEmail(), "", "Account Reactivation Notification", emailTemplate);

        return ResponseEntity.ok().build();
    }

    private User getUserFromJwtToken(HttpServletRequest httpServletRequest) {
        String authHeader = httpServletRequest.getHeader("Authorization");
        String username = JwtUtil.extractUsername(authHeader.substring(7));
        
        return accountManagementService.getUserByUsername(username).get();
    }
}
