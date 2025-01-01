package com.example.beercommunity.dto;

public class BreweriesSearchDto {

    private Integer page;

    private String search;

    private String filter;

    private Integer country;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public Integer getCountry() {
        return country;
    }

    public void setCountry(Integer country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "BreweriesSearchDto{" +
                "page='" + page + '\'' +
                ", search=" + search +
                ", filter=" + filter +
                ", country=" + country +
                '}';
    }
}
