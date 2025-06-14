package com.meow.meow.controller;

import com.meow.meow.model.Movie;
import com.meow.meow.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/findAll")
    public List<Movie> findAll(){
        return movieService.getAllMovies();
    }

}
