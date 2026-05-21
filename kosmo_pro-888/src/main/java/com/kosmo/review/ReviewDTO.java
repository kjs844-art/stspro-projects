package com.kosmo.review;

import lombok.Data;

@Data
public class ReviewDTO {
    private Long reviewId;
    private String author;
    private String content;
    private Integer rating;
}
