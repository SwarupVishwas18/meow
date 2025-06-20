package com.meow.meow.service;

import com.meow.meow.model.Movie;
import com.meow.meow.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{

    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }


    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public List<Movie> getMovieByTmdbAndCat(Long id, String cat) {
        return movieRepository.findByTmdbAndCat(id, cat);
    }

    @Override
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public Movie updateMovie(Long id, Movie movie) {
        Movie foundMovie = movieRepository.findById(id).orElseThrow();
        foundMovie.setStatus(movie.getStatus());
        foundMovie.setCount(movie.getCount());
        foundMovie.setUrl(movie.getUrl());
        foundMovie.setCat(movie.getCat());

        return movieRepository.save(foundMovie);

    }

    @Override
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public List<Movie> getMoviesByStatus(int status) {
        return movieRepository.findByStatus(status);
    }
}
