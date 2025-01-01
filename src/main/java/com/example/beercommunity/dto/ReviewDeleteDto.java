package com.example.beercommunity.dto;

public class ReviewDeleteDto {

    private Integer id;

    private Boolean notifyUser;

    private String description;

    public ReviewDeleteDto() {

    }

    public ReviewDeleteDto(Integer id, Boolean notifyUser, String description) {
        this.id = id;
        this.notifyUser = notifyUser;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getNotifyUser() {
        return notifyUser;
    }

    public void setNotifyUser(Boolean notifyUser) {
        this.notifyUser = notifyUser;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "ReviewDeleteDto{" +
                "id='" + id + '\'' +
                ", notifyUser=" + notifyUser +
                ", description=" + description +
                '}';
    }
}
