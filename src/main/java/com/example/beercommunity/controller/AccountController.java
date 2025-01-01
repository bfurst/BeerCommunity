package com.example.beercommunity.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.beercommunity.BeerCommunityApplication;
import com.example.beercommunity.components.JwtUtil;
import com.example.beercommunity.dto.CreateUserDto;
import com.example.beercommunity.dto.EmptyJsonResponse;
import com.example.beercommunity.dto.LoginDto;
import com.example.beercommunity.dto.ProfileImageDto;
import com.example.beercommunity.dto.QueryDto;
import com.example.beercommunity.dto.UserDto;
import com.example.beercommunity.exception.CustomExceptions;
import com.example.beercommunity.model.User;
import com.example.beercommunity.service.AccountManagementService;
import com.example.beercommunity.service.EmailService;
import com.example.beercommunity.service.ReCaptchaService;
import com.example.beercommunity.service.RedisService;
import com.fasterxml.jackson.core.JsonProcessingException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin(origins = "https://localhost:3000")
public class AccountController {

    private final String UPLOADS_PROFILE_PATH = "uploads/profile/";

    private final AccountManagementService accountManagementService;

    private final ReCaptchaService reCaptchaService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    private final EmailService emailService;

    @Autowired
    private RedisService redisService;

    public AccountController(AccountManagementService accountManagementService, ReCaptchaService reCaptchaService,
            JwtUtil jwtUtil, EmailService emailService) {
        this.accountManagementService = accountManagementService;
        this.reCaptchaService = reCaptchaService;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    @RequestMapping(value = "/ping", method = RequestMethod.GET)
    public String ping() {
        return "Hello World!";
    }

    @RequestMapping(value = "/status", method = RequestMethod.GET)
    public ResponseEntity<Void> status() {
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/existsByUsername", method = RequestMethod.GET)
    public ResponseEntity<Boolean> usernameAlredyExists(@RequestParam String username) {
        Optional<User> user = accountManagementService.getUserByUsername(username);
        if (user.isPresent())
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.ok(false);
    }

    @RequestMapping(value = "/existsByEmail", method = RequestMethod.GET)
    public ResponseEntity<Boolean> emailAlredyExists(@RequestParam String email) {
        Optional<User> user = accountManagementService.getUserByEmail(email);
        if (user.isPresent())
            return ResponseEntity.ok(true);
        else
            return ResponseEntity.ok(false);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@RequestBody @Valid CreateUserDto createUserDto, BindingResult result)
            throws CustomExceptions.ConflictException, CustomExceptions.ReCaptchaValidationFailedException,
            CustomExceptions.BadRequestException {
        if (!result.hasErrors()) {

            Optional<User> userExistsByEmail = accountManagementService.getUserByEmail(createUserDto.getEmail());
            Optional<User> userExistsByUsername = accountManagementService
                    .getUserByUsername(createUserDto.getUsername());

            if (userExistsByEmail.isPresent() || userExistsByUsername.isPresent())
                throw new CustomExceptions.ConflictException();

            Boolean reCaptahaValid = reCaptchaService.validateReCaptcha(createUserDto.getToken());

            if (reCaptahaValid) {
                User user = new User(createUserDto.getUsername(), createUserDto.getEmail(), createUserDto.getPassword(),
                        false, 2);
                User createdUser = accountManagementService.createUser(user);
                return ResponseEntity.ok(createdUser);
            } else {
                throw new CustomExceptions.ReCaptchaValidationFailedException();
            }
        }

        throw new CustomExceptions.BadRequestException();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        User updatedUser = accountManagementService.updateUser(id, user);

        return ResponseEntity.ok().body(updatedUser);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> selectUser(@PathVariable String id) throws CustomExceptions.ResourceNotFoundException {
        Optional<User> user = accountManagementService.getUserById(id);
        if (user.isPresent())
            return ResponseEntity.ok(user.get());
        else
            throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public ResponseEntity<User> selectUserByEmail(@RequestParam String email)
            throws CustomExceptions.ResourceNotFoundException {
        Optional<User> user = accountManagementService.getUserByEmail(email);
        if (user.isPresent())
            return ResponseEntity.ok(user.get());
        else
            throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        accountManagementService.deleteUser(new User(id));
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/verify-email", method = RequestMethod.POST)
    public ResponseEntity<Void> verifyEmail(@RequestBody Map<String, Object> request)
            throws JsonProcessingException, MessagingException, CustomExceptions.ResourceNotFoundException {

        String email = request.get("email").toString();
        Optional<User> user = accountManagementService.getUserByEmail(email);

        if (user.isPresent() && !user.get().getAccountConfirmed()) {
            String token = "";
            String redisKey = String.format("user:%s:*", user.get().getId());
            Set<String> keys = redisService.getKeys(redisKey);

            for (String key : keys) {
                Map<String, Object> data = redisService.getData(key);
                if (data.get("tokenType").equals("email-verification")) {
                    token = key.split(":")[2];
                    break;
                }
            }

            if (token.isEmpty()) {
                token = UUID.randomUUID().toString();
                redisService.saveData(user.get().getId(), token, "email-verification");
            }

            emailService.sendHtmlMessage(
                    email,
                    "",
                    "BeerCommunity Email Verification",
                    emailService.getEmailVerificationHtmlTemplate(token));

            return ResponseEntity.ok().build();
        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/verify-email/{token}", method = RequestMethod.PUT)
    public ResponseEntity<Void> completeRegistration(@PathVariable String token)
            throws CustomExceptions.ResourceNotFoundException {
        String redisKey = String.format("user:*:%s", token);
        Optional<String> key = redisService.getKeys(redisKey).stream().findFirst();

        if (key.isEmpty()) {
            throw new CustomExceptions.ResourceNotFoundException();
        } else {
            String id = key.get().split(":")[1];
            redisService.deleteData(key.get());

            User user = accountManagementService.getUserById(id).get();
            user.setAccountConfirmed(true);
            accountManagementService.updateUser(id, user);
        }

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody @Valid LoginDto loginDto, BindingResult result)
            throws CustomExceptions.BadRequestException, CustomExceptions.ForbiddenAccessException,
            CustomExceptions.ResourceNotFoundException {

        if (result.hasErrors())
            throw new CustomExceptions.BadRequestException();

        Optional<User> user = accountManagementService.login(loginDto.getInput(), loginDto.getPassword());

        if (user.isPresent()) {

            Boolean hasActiveRestriction = accountManagementService.hasActiveRestriction(user.get().getId());
            if (hasActiveRestriction)
                throw new CustomExceptions.ForbiddenAccessException();

            UserDetails userDetails = accountManagementService.loadUserByUsername(user.get().getUsername());
            BeerCommunityApplication.logger.warn(userDetails.getUsername() + " " + userDetails.getPassword());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword()));
            String jwt = jwtUtil.generateToken(user.get().getUsername(), user.get().getRole().getName(),
                    loginDto.getRemember());
            String jsonToken = "{\"token\": \"" + jwt + "\"}";

            return ResponseEntity.ok(jsonToken);
        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/isValid", method = RequestMethod.GET)
    public ResponseEntity<?> isTokenValid(@RequestParam String token)
            throws CustomExceptions.ResourceNotFoundException {
        try {
            Jwts.parser().setSigningKey(JwtUtil.SECRET_KEY).parseClaimsJws(token).getBody();
            String username = JwtUtil.extractUsername(token);
            Optional<User> user = accountManagementService.getUserByUsername(username);
            if (!user.isPresent())
                throw new CustomExceptions.ResourceNotFoundException();

            String role = jwtUtil.extractRoles(token).replace("ROLE_", "");
            UserDto userDto = new UserDto(user.get().getId(), username, user.get().getEmail(),
                    user.get().getProfileImage(),
                    user.get().getCreatedAt(), role);

            return ResponseEntity.ok(userDto);
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
                | IllegalArgumentException exception) {
            return ResponseEntity.ok(new EmptyJsonResponse());
        }
    }

    @RequestMapping(value = "/verify-pswd-reset", method = RequestMethod.POST)
    public ResponseEntity<Void> verifyPswdReset(@RequestBody Map<String, Object> request)
            throws JsonProcessingException, MessagingException, CustomExceptions.ResourceNotFoundException {

        String email = request.get("email").toString();
        Optional<User> user = accountManagementService.getUserByEmail(email);

        if (user.isPresent() && user.get().getAccountConfirmed()) {

            String token = "";
            String redisKey = String.format("user:%s:*", user.get().getId());
            Set<String> keys = redisService.getKeys(redisKey);

            for (String key : keys) {
                Map<String, Object> data = redisService.getData(key);
                if (data.get("tokenType").equals("pswd-reset")) {
                    token = key.split(":")[2];
                    break;
                }
            }

            if (token.isEmpty()) {
                token = UUID.randomUUID().toString();
                redisService.saveData(user.get().getId(), token, "pswd-reset");
            }

            emailService.sendHtmlMessage(
                    email,
                    "",
                    "BeerCommunity Password Reset Verification",
                    emailService.getPasswordResetHtmlTemplate(token));

            return ResponseEntity.ok().build();

        }

        throw new CustomExceptions.ResourceNotFoundException();
    }

    @RequestMapping(value = "/verify-email-change", method = RequestMethod.POST)
    public ResponseEntity<Void> verifyEmailChange(@RequestBody Map<String, Object> request,
            HttpServletRequest httpServletRequest)
            throws JsonProcessingException, MessagingException, CustomExceptions.ResourceNotFoundException {

        String email = request.get("email").toString();
        User user = getUserFromJwtToken(httpServletRequest);
        Optional<User> existingUser = accountManagementService.getUserByEmail(email);

        if (existingUser.isPresent())
            throw new CustomExceptions.ResourceNotFoundException();

        String token = "";
        String redisKey = String.format("user:%s:*", user.getId());
        Set<String> keys = redisService.getKeys(redisKey);

        for (String key : keys) {
            Map<String, Object> data = redisService.getData(key);
            if (data.get("tokenType").equals("email-change")) {
                String existsingEmail = data.get("email").toString();
                token = key.split(":")[2];

                if (!existsingEmail.equals(email)) {
                    redisService.deleteData(key);
                    token = UUID.randomUUID().toString();
                    redisService.saveData(user.getId(), token, "email-change", email);
                }

                break;
            }
        }

        if (token.isEmpty()) {
            token = UUID.randomUUID().toString();
            redisService.saveData(user.getId(), token, "email-change", email);
        }

        emailService.sendHtmlMessage(
                email,
                "",
                "BeerCommunity Email Address Change Verification",
                emailService.getEmailResetHtmlTemplate(token));

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/verify-account-delete", method = RequestMethod.POST)
    public ResponseEntity<Void> verifyAccountDelete(HttpServletRequest httpServletRequest)
            throws JsonProcessingException, MessagingException {

        User user = getUserFromJwtToken(httpServletRequest);

        String token = "";
        String redisKey = String.format("user:%s:*", user.getId());
        Set<String> keys = redisService.getKeys(redisKey);

        for (String key : keys) {
            Map<String, Object> data = redisService.getData(key);
            if (data.get("tokenType").equals("delete-account")) {
                token = key.split(":")[2];
                break;
            }
        }

        if (token.isEmpty()) {
            token = UUID.randomUUID().toString();
            redisService.saveData(user.getId(), token, "delete-account");
        }

        emailService.sendHtmlMessage(
                user.getEmail(),
                "",
                "BeerCommunity Delete Account Verification",
                emailService.getAccountDeleteHtmlTemplate(token));

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/email-change", method = RequestMethod.POST)
    public ResponseEntity<Void> changeEmailAddress(@RequestBody Map<String, Object> request)
            throws JsonProcessingException, CustomExceptions.ResourceNotFoundException {

        String token = request.get("token").toString();

        String redisKey = String.format("user:*:%s", token);
        Optional<String> key = redisService.getKeys(redisKey).stream().findFirst();

        if (key.isEmpty()) {
            throw new CustomExceptions.ResourceNotFoundException();
        } else {
            Map<String, Object> data = redisService.getData(key.get());
            String id = key.get().split(":")[1];
            String email = data.get("email").toString();
            redisService.deleteData(key.get());

            User user = accountManagementService.getUserById(id).get();
            user.setEmail(email);
            accountManagementService.updateUser(id, user);
        }

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/pswd-reset", method = RequestMethod.PUT)
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, Object> request)
            throws CustomExceptions.ResourceNotFoundException {
        try {
            String token = request.get("token").toString();
            String pswd = request.get("password").toString();

            String redisKey = String.format("user:*:%s", token);
            Optional<String> key = redisService.getKeys(redisKey).stream().findFirst();

            if (key.isEmpty()) {
                throw new CustomExceptions.ResourceNotFoundException();
            } else {
                String id = key.get().split(":")[1];
                redisService.deleteData(key.get());

                User user = accountManagementService.getUserById(id).get();
                user.setPassword(pswd);
                accountManagementService.updateUser(user);
            }

            return ResponseEntity.ok().build();

        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
                | IllegalArgumentException exception) {
            return ResponseEntity.ok(false);
        }
    }

    @RequestMapping(value = "/delete-account", method = RequestMethod.PUT)
    public ResponseEntity<Void> deleteAccount(@RequestBody Map<String, Object> request)
            throws CustomExceptions.ResourceNotFoundException {
        try {
            String token = request.get("token").toString();

            String redisKey = String.format("user:*:%s", token);
            Optional<String> key = redisService.getKeys(redisKey).stream().findFirst();

            if (key.isEmpty()) {
                throw new CustomExceptions.ResourceNotFoundException();
            } else {
                String id = key.get().split(":")[1];
                redisService.deleteData(key.get());

                User user = accountManagementService.getUserById(id).get();
                user.setAccountDeleted(true);
                accountManagementService.updateUser(user.getId(), user);
            }

            return ResponseEntity.ok().build();

        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException
                | IllegalArgumentException exception) {
            BeerCommunityApplication.logger.warn(exception.getMessage());
            throw new CustomExceptions.BadRequestException();
        }
    }

    @RequestMapping(value = "/query", method = RequestMethod.POST)
    public ResponseEntity<QueryDto> sendQuery(@RequestBody QueryDto queryDto,
            HttpServletRequest httpServletRequest)
            throws MessagingException, CustomExceptions.TooManyRequestsException {

        String clientIpAddress = getClientIpAddress(httpServletRequest);
        Boolean requestLimitReached = redisService.requestLimitReached(clientIpAddress);

        if (requestLimitReached)
            throw new CustomExceptions.TooManyRequestsException();

        /*
         * emailService.sendHtmlMessage(
         * "admin@revbeer.info",
         * "",
         * queryDto.getSubject(),
         * queryDto.getBody());
         */

        emailService.sendHtmlMessage(
                queryDto.getEmail(),
                "",
                "Hi there! ... ",
                emailService.getAutoResponseHtmlTemplate());

        redisService.recordUserRequest(clientIpAddress);

        return ResponseEntity.ok().body(queryDto);
    }

    @RequestMapping(value = "/upload-image", method = RequestMethod.PUT)
    public ResponseEntity<ProfileImageDto> uploadProfileImage(@RequestParam("file") MultipartFile file,
            HttpServletRequest httpServletRequest) throws IOException, CustomExceptions.BadRequestException {

        if (file == null || file.isEmpty())
            throw new CustomExceptions.BadRequestException();

        User user = getUserFromJwtToken(httpServletRequest);
        Path uploadPath = Paths.get(UPLOADS_PROFILE_PATH);

        if (user.getProfileImage() != null)
            Files.delete(uploadPath.resolve(user.getProfileImage()));

        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        user.setProfileImage(fileName);
        accountManagementService.updateUser(user.getId(), user);

        ProfileImageDto profileImageDto = new ProfileImageDto();
        profileImageDto.setFullName(fileName);

        return ResponseEntity.ok(profileImageDto);
    }

    @RequestMapping(value = "/remove-image", method = RequestMethod.PUT)
    public ResponseEntity<Void> removeProfileImage(HttpServletRequest httpServletRequest)
            throws IOException, CustomExceptions.BadRequestException {

        User user = getUserFromJwtToken(httpServletRequest);
        Path uploadPath = Paths.get(UPLOADS_PROFILE_PATH);

        if (user.getProfileImage() != null)
            Files.delete(uploadPath.resolve(user.getProfileImage()));
        else
            throw new CustomExceptions.BadRequestException();

        user.setProfileImage(null);
        accountManagementService.updateUser(user.getId(), user);

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/log-error", method = RequestMethod.POST)
    public ResponseEntity<Void> logError(@RequestBody Map<String, Object> request) {

        String error = request.get("Error").toString();
        BeerCommunityApplication.logger.info(error);

        return ResponseEntity.ok().build();
    }

    private User getUserFromJwtToken(HttpServletRequest httpServletRequest) {

        String authHeader = httpServletRequest.getHeader("Authorization");
        String username = JwtUtil.extractUsername(authHeader.substring(7));

        return accountManagementService.getUserByUsername(username).get();
    }

    public String getClientIpAddress(HttpServletRequest request) {

        String ip = request.getHeader("X-Forwarded-For");
        if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip))
            return ip.split(",")[0];

        ip = request.getHeader("Proxy-Client-IP");
        if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip))
            return ip;

        ip = request.getHeader("WL-Proxy-Client-IP");
        if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip))
            return ip;

        ip = request.getHeader("HTTP_CLIENT_IP");
        if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip))
            return ip;

        ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip))
            return ip;

        return request.getRemoteAddr();
    }
}
