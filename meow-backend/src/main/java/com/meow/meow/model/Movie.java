package com.meow.meow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Movie {
    @Id
    private Long id;

    private int status;
    private String cat;

    private String filePath;

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    private String count;

    public void setId(Long id) {
        this.id = id;
    }



    public void setStatus(int status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }



    public int getStatus() {
        return status;
    }

    public String getCat() {
        return cat;
    }

    public void setCat(String cat) {
        this.cat = cat;
    }
}
