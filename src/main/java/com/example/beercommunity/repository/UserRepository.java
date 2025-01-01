package com.example.beercommunity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.beercommunity.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    @Query(value = """
            SELECT * FROM users
            WHERE username = ?1 AND account_deleted = FALSE""", nativeQuery = true)
    public Optional<User> getUserByUsername(String username);

    @Query(value = """
            SELECT * FROM users
            WHERE email = ?1 AND account_deleted = FALSE""", nativeQuery = true)
    public Optional<User> getUserByEmail(String email);

    @Query(value = """
            SELECT * FROM users
            WHERE (username = ?1 OR email = ?1) AND password = ?2 AND account_confirmed = TRUE AND account_deleted = FALSE""", nativeQuery = true)
    public Optional<User> login(String input, String pswd);

    @Query(value = """
            SELECT COUNT(*) FROM users
            WHERE id = ?1 AND account_confirmed = TRUE AND account_deleted = FALSE""", nativeQuery = true)
    public Optional<User> isActive(String userId);
}
