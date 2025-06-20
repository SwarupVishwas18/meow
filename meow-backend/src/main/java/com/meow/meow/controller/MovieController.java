package com.meow.meow.controller;

import com.meow.meow.model.Movie;
import com.meow.meow.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/getAll")
    public List<Movie> getAllMovies(){
        return movieService.getAllMovies();
    }

    @GetMapping("/get/{id}")
    public List<Movie> getMovieByTmdbId(@PathVariable Long id, @RequestParam String cat){
        return movieService.getMovieByTmdbAndCat(id,cat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){
        movieService.deleteMovie(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getByStatus/{status}")
    public List<Movie> getByStatus(@PathVariable int status) {
        return movieService.getMoviesByStatus(status);
    }

    @PostMapping("/save")
    public Movie saveMovie(@RequestBody Movie movie){
        return movieService.saveMovie(movie);
    }

    @PostMapping("/update/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie){
        System.out.println(id);
        return movieService.updateMovie(id, movie);
    }
}
