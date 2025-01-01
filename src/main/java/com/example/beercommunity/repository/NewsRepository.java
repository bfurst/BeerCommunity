package com.example.beercommunity.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.beercommunity.model.News;

@Repository
public interface NewsRepository extends CrudRepository<News, Integer> {
    
    @Query(value = "SELECT * FROM news ORDER BY created_at DESC LIMIT ?1 OFFSET ?2", nativeQuery = true)
    public Iterable<News> getNews(Integer limit, Integer offset);

    @Query(value = "SELECT * FROM news WHERE LOWER(subject) LIKE %?1% ORDER BY created_at DESC LIMIT ?2 OFFSET ?3", nativeQuery = true)
    public Iterable<News> getNews(String searchTerm, Integer limit, Integer offset);

    @Query(value = "SELECT COUNT(*) FROM news WHERE LOWER(subject) LIKE %?1%", nativeQuery = true)
    public Integer countNews(String searchTerm);
}
