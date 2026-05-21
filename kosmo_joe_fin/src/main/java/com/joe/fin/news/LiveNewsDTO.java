package com.joe.fin.news;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LiveNewsDTO {
    private String title;
    private String source;
    private String link;
    private String publishedAt;
    private String summary;
}
