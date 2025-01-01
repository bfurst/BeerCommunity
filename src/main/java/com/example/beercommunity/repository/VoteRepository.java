package com.example.beercommunity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.beercommunity.model.Vote;
import com.example.beercommunity.model.VoteId;

public interface VoteRepository extends CrudRepository<Vote, VoteId> {
    
    @Query(value = "SELECT * FROM votes WHERE user_id = ?1 AND review_id = ?2 AND type = 'Like' LIMIT 1", nativeQuery = true)
    public Optional<Vote> getLike(String userId, Integer reviewId);

    @Query(value = "SELECT * FROM votes WHERE user_id = ?1 AND review_id = ?2 AND type = 'Dislike' LIMIT 1", nativeQuery = true)
    public Optional<Vote> getDislike(String userId, Integer reviewId);

    @Query(value = "SELECT COUNT(*) FROM votes WHERE review_id = ?1 AND type = 'Like'", nativeQuery = true)
    public Integer getLikesCount(Integer reviewId);

    @Query(value = "SELECT COUNT(*) FROM votes WHERE review_id = ?1 AND type = 'Dislike'", nativeQuery = true)
    public Integer getDislikesCount(Integer reviewId);
}
