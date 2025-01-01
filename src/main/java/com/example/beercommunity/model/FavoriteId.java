package com.example.beercommunity.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class FavoriteId implements Serializable{

    private String userId;

    private Integer beerId;

    public FavoriteId() {

    }

    public FavoriteId(String userId, Integer beerId) {
        this.userId = userId;
        this.beerId = beerId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getBeerId() {
        return beerId;
    }

    public void setBeerId(Integer beerId) {
        this.beerId = beerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) 
            return true;

        if (o == null || getClass() != o.getClass()) 
            return false;
            
        FavoriteId favoriteId = (FavoriteId) o;
        return Objects.equals(userId, favoriteId.userId) &&
               Objects.equals(beerId, favoriteId.beerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, beerId);
    }
}
