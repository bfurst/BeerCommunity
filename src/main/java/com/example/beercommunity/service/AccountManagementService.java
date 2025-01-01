package com.example.beercommunity.service;

import java.util.Optional;
import java.util.UUID;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.beercommunity.BeerCommunityApplication;
import com.example.beercommunity.model.Restriction;
import com.example.beercommunity.model.RestrictionCategory;
import com.example.beercommunity.model.User;
import com.example.beercommunity.repository.RestrictionCategoryRepository;
import com.example.beercommunity.repository.RestrictionRepository;
import com.example.beercommunity.repository.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Validator;

@Service
public class AccountManagementService implements UserDetailsService {

    private final Validator validator;

    private final UserRepository userRepository;

    private final RestrictionCategoryRepository restrictionCategoryRepository;

    private final RestrictionRepository restrictionRepository;

    public AccountManagementService(Validator validator, UserRepository userRepository,
            RestrictionCategoryRepository restrictionCategoryRepository, RestrictionRepository restrictionRepository) {
        this.validator = validator;
        this.userRepository = userRepository;
        this.restrictionCategoryRepository = restrictionCategoryRepository;
        this.restrictionRepository = restrictionRepository;
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    public Boolean isUserValid(User user) {
        return validator.validate(user).isEmpty();
    }

    public User createUser(User user) {
        UUID uuid = UUID.randomUUID();
        user.setId(uuid.toString());
        user.setPassword(DigestUtils.sha256Hex(user.getPassword()));
        userRepository.save(user);
        return userRepository.findById(uuid.toString()).get();
    }

    @Transactional
    public User updateUser(User user) {
        BeerCommunityApplication.logger.info(user.toString());
        user.setPassword(DigestUtils.sha256Hex(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(String id, User newUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setEmail(newUser.getEmail());
                    user.setPassword(newUser.getPassword());
                    user.setAccountConfirmed(newUser.getAccountConfirmed());
                    user.setRole(user.getRole());

                    return userRepository.save(user);
                })
                .get();
    }

    public Boolean isUserActive(String userId) {
        return Boolean.parseBoolean(userRepository.isActive(userId).toString());
    }

    @Transactional
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public Optional<User> login(String input, String pswd) {
        return userRepository.login(input, DigestUtils.sha256Hex(pswd));
    }

    public Iterable<RestrictionCategory> getRestrictionCategories() {
        return restrictionCategoryRepository.findAll();
    }

    public Optional<RestrictionCategory> getRestrictionCategory(Integer restrictionCategoryId) {
        return restrictionCategoryRepository.findById(restrictionCategoryId);
    }

    public Optional<Restriction> getActiveRestriction(String userId) {
        return restrictionRepository.getActiveRestriction(userId);
    }

    public Boolean hasActiveRestriction(String userId) {
        Integer count = restrictionRepository.countActiveRestrictions(userId);
        return count > 0;
    }

    public Restriction updateRestriction(Restriction restriction) {
        return restrictionRepository.save(restriction);
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.getUserByUsername(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }

        return user.get();
    }
}
