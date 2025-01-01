package com.example.beercommunity.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    private String id;

    @Column(length = 16, nullable = false)
    private String username;

    @Column(length = 320, nullable = false)
    @Email
    private String email;

    @Column(nullable = false, name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "profile_image", nullable = true)
    private String profileImage;

    @Column(name = "account_confirmed", nullable = false)
    private Boolean accountConfirmed;

    @Column(name = "account_deleted", columnDefinition = "BIT DEFAULT 0")
    private Boolean accountDeleted = false;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @Transient
    private String reCaptchaToken;

    @Transient
    private Boolean enabled = true;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Restriction> restrictions;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Review> reviews;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Favorite> favorites;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<Vote> votes;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<News> news;

    public User() {

    }

    public User(String id) {
        this.id = id;
    }

    public User(String username, String email, String password, Boolean accountConfirmed, Integer roleId) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.accountConfirmed = accountConfirmed;
        this.role = new Role(roleId);
    }

    public User(String id, String username, String email, String password, Boolean accountConfirmed, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.accountConfirmed = accountConfirmed;
        this.role = role;
    }

    public User(String id, String username, String email, String password, String profileImage,
            Boolean accountConfirmed, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
        this.accountConfirmed = accountConfirmed;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Boolean getAccountConfirmed() {
        return accountConfirmed;
    }

    public void setAccountConfirmed(Boolean accountConfirmed) {
        this.accountConfirmed = accountConfirmed;
    }

    public Boolean getAccountDeleted() {
        return accountDeleted;
    }

    public void setAccountDeleted(Boolean accountDeleted) {
        this.accountDeleted = accountDeleted;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<Restriction> getRestrictions() {
        return restrictions;
    }

    public void setRestrictions(Set<Restriction> restrictions) {
        this.restrictions = restrictions;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public String getReCaptchaToken() {
        return reCaptchaToken;
    }

    public void setReCaptchaToken(String reCaptchaToken) {
        this.reCaptchaToken = reCaptchaToken;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(getRole().getName()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public Set<News> getNews() {
        return news;
    }

    public void setNews(Set<News> news) {
        this.news = news;
    }

    @Override
    public String toString() {
        return String.format("""
                Id: %s
                Username: %s
                Email: %s
                PasswordHash: %s
                Profile Image:
                Account Confirmed: %b
                Created: %s
                Updated: %s
                Role: %s""",
                id, username, email, password, profileImage, accountConfirmed, createdAt.toString(),
                updatedAt.toString(), role.getName());
    }

    public Set<Favorite> getFavorites() {
        return favorites;
    }

    public void setFavorites(Set<Favorite> favorites) {
        this.favorites = favorites;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public void setVotes(Set<Vote> votes) {
        this.votes = votes;
    }
}
