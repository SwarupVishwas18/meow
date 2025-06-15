package com.meow.meow.service;

import com.meow.meow.model.Movie;
import com.meow.meow.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    @Override
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public Movie updateMovie(Long id, Movie movie) {
        Movie foundMovie = movieRepository.findById(id).orElseThrow();
        foundMovie.setStatus(movie.getStatus());
        foundMovie.setRecommendedBy(movie.getRecommendedBy());
        foundMovie.setWatchingWith(movie.getWatchingWith());

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
