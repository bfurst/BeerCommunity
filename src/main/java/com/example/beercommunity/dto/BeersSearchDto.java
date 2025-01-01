package com.example.beercommunity.dto;

public class BeersSearchDto {

    private Integer breweryId;

    private Integer page;

    private String search;

    private String filter;

    private Integer category;

    private Integer shade;

    public Integer getBreweryId() {
        return breweryId;
    }

    public void setBreweryId(Integer breweryId) {
        this.breweryId = breweryId;
    }

    public Integer getPage() {
        return page;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }
    
    public Integer getShade() {
        return shade;
    }

    public void setShade(Integer shade) {
        this.shade = shade;
    }

    @Override
    public String toString() {
        return "BeersSearchDto{" +
                "breweryId='" + breweryId + '\'' +
                ", page='" + page + '\'' +
                ", search=" + search +
                ", filter=" + filter +
                ", category=" + category +
                ", shade=" + shade +
                '}';
    }
}
