package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.beercommunity.model.Favorite;
import com.example.beercommunity.model.FavoriteId;

@Repository
public interface FavoriteRepository extends CrudRepository<Favorite, FavoriteId> {
    
    @Query(value = "SELECT favorites.beer_id FROM favorites INNER JOIN beers ON beers.id = favorites.beer_id WHERE favorites.user_id = ?1 AND beers.brewery_id = ?2", nativeQuery = true)
    public Iterable<Integer> getFavorites(String userId, Integer berwerieId);
}
