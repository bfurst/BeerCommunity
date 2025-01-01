package com.example.beercommunity.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "favorites")
public class Favorite {

    @EmbeddedId
    @JsonIgnore
    private FavoriteId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("beerId")
    @JoinColumn(name = "beer_id")
    @JsonIgnore
    private Beer beer;

    public Favorite() {

    }

    public Favorite(User user, Beer beer) {
        this.id = new FavoriteId(user.getId(), beer.getId());
        this.user = user;
        this.beer = beer;
    }

    public Favorite(String userId, Integer beerId) {
        this.id = new FavoriteId(userId, beerId);
        this.user = new User(userId);
        this.beer = new Beer(beerId);
    }

    public FavoriteId getId() {
        return id;
    }

    public void setId(FavoriteId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Beer getBeer() {
        return beer;
    }

    public void setBeer(Beer beer) {
        this.beer = beer;
    }
}
