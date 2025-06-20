package com.meow.meow.service;

import com.meow.meow.model.Movie;

import java.util.List;

public interface MovieService {
    List<Movie> getAllMovies();
    List<Movie> getMovieByTmdbAndCat(Long id, String cat);
    Movie saveMovie(Movie movie);
    Movie updateMovie(Long id, Movie movie);
    void deleteMovie(Long id);

    List<Movie> getMoviesByStatus(int status);
}
