package com.example.beercommunity.dto;

public class GetNewsDto {

    private Integer page;

    private String search;

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

    @Override
    public String toString() {
        return "NewsDto{" +
                "page='" + page + '\'' +
                ", search=" + search +
                '}';
    }
}
