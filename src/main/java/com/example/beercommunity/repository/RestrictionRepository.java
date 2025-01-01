package com.example.beercommunity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.Restriction;

public interface RestrictionRepository extends CrudRepository<Restriction, Integer> {

    @Query(value = """
            SELECT * FROM restrictions
            WHERE is_active = TRUE AND user_id = ?1""", nativeQuery = true)
    public Optional<Restriction> getActiveRestriction(String userId);

    @Query(value = """
                SELECT COUNT(*) FROM restrictions
                WHERE is_active = TRUE AND user_id = ?1""", nativeQuery = true)
    public Integer countActiveRestrictions(String userId);

}
