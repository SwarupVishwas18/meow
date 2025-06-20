package com.meow.meow.repository;

import com.meow.meow.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query(value = "SELECT * FROM Movie WHERE status = ?1", nativeQuery = true)
    List<Movie> findByStatus(int status);

    @Query(value = "SELECT * FROM Movie WHERE tmdb_id=?1 and cat=?2", nativeQuery = true)
    List<Movie> findByTmdbAndCat(Long tmdb_id, String cat);
}
