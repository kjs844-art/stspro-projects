package com.joe.fin.market;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/market")
public class MarketIndexApiController {
    private final MarketIndexService marketIndexService;

    public MarketIndexApiController(MarketIndexService marketIndexService) {
        this.marketIndexService = marketIndexService;
    }

    @GetMapping("/indices")
    public Map<String, Object> indices() {
        List<MarketIndexDTO> indices = marketIndexService.getIndices();
        boolean hasLive = indices.stream().anyMatch(index -> "YAHOO".equals(index.getSource()));

        Map<String, Object> response = new HashMap<>();
        response.put("source", hasLive ? "yahoo" : "fallback");
        response.put("updatedAt", LocalDateTime.now().toString());
        response.put("indices", indices);
        return response;
    }
}
