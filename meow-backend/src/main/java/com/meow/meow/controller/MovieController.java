package com.meow.meow.controller;

import com.meow.meow.model.Movie;
import com.meow.meow.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/video/{id}")
    public ResponseEntity<Resource> streamVideo(@PathVariable Long id, @RequestHeader HttpHeaders httpHeaders) throws IOException {
        Optional<Movie> movie = movieService.getMovieById(id);

        if(movie.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
            File video = new File(movie.get().getUrl());

            if(!video.exists()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            long fileLength = video.length();
            String range = httpHeaders.getFirst(HttpHeaders.RANGE);

            long start = 0;
            long end = fileLength - 1;

            if (range != null && range.startsWith("bytes=")) {
                String[] parts = range.substring("bytes=".length()).split("-");
                start = Long.parseLong(parts[0]);
                if (parts.length > 1 && !parts[1].isEmpty()) {
                    end = Long.parseLong(parts[1]);
                }
            }

            long contentLength = end - start + 1;
            InputStream inputStream = new FileInputStream(video);
            inputStream.skip(start);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaTypeFactory.getMediaType(video.getName()).orElse(MediaType.APPLICATION_OCTET_STREAM));
            responseHeaders.setContentLength(contentLength);
            responseHeaders.set("Accept-Ranges", "bytes");
            responseHeaders.set("Content-Range", "bytes " + start + "-" + end + "/" + fileLength);

            return new ResponseEntity<>(
                    new InputStreamResource(inputStream),
                    responseHeaders,
                    HttpStatus.PARTIAL_CONTENT
            );

    }
}
