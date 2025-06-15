package com.meow.meow.service;

import com.meow.meow.model.Movie;

import java.util.List;
import java.util.Optional;

public interface MovieService {
    List<Movie> getAllMovies();
    Optional<Movie> getMovieById(Long id);
    Movie saveMovie(Movie movie);
    Movie updateMovie(Long id, Movie movie);
    void deleteMovie(Long id);

    List<Movie> getMoviesByStatus(int status);
}
