package com.meow.meow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Movie {
    @Id
    private Long id;
    private String watchingWith;
    private String recommendedBy;
    private int status;

    public void setId(Long id) {
        this.id = id;
    }

    public void setWatchingWith(String watchingWith) {
        this.watchingWith = watchingWith;
    }

    public void setRecommendedBy(String recommendedBy) {
        this.recommendedBy = recommendedBy;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getWatchingWith() {
        return watchingWith;
    }

    public String getRecommendedBy() {
        return recommendedBy;
    }

    public int getStatus() {
        return status;
    }
}
