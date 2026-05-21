package com.joe.fin.news;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/news")
public class LiveNewsApiController {
    private final LiveNewsService liveNewsService;

    public LiveNewsApiController(LiveNewsService liveNewsService) {
        this.liveNewsService = liveNewsService;
    }

    @GetMapping("/live")
    public Map<String, Object> live(@RequestParam(defaultValue = "current") String category) {
        List<LiveNewsDTO> items = liveNewsService.getNews(category);
        Map<String, Object> response = new HashMap<>();
        response.put("category", category);
        response.put("source", "google-news-rss");
        response.put("updatedAt", LocalDateTime.now().toString());
        response.put("items", items);
        return response;
    }
}
