package com.joe.fin.stock;

import java.util.List;

import com.joe.fin.member.AccessPolicyDTO;
import com.joe.fin.news.NewsDTO;
import com.joe.fin.news.NewsService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class StockController {
    private final StockService stockService;
    private final NewsService newsService;

    public StockController(StockService stockService, NewsService newsService) {
        this.stockService = stockService;
        this.newsService = newsService;
    }

    @GetMapping("/stocks")
    public String searchForm() {
        return "stock/search";
    }

    @GetMapping("/stocks/search")
    public String search(@RequestParam(defaultValue = "NVDA") String ticker,
                         @RequestParam(defaultValue = "FREE") String plan,
                         Model model) {
        String cleanTicker = ticker.trim().toUpperCase();
        AccessPolicyDTO accessPolicy = resolvePolicy(plan);
        List<NewsDTO> newsList = newsService.findBySymbol(cleanTicker)
            .stream()
            .limit(accessPolicy.getNewsLimit())
            .toList();

        StockDTO stock = stockService.getStockData(cleanTicker);
        model.addAttribute("stock", stock);
        model.addAttribute("newsList", newsList);
        model.addAttribute("ticker", cleanTicker);
        model.addAttribute("accessPolicy", accessPolicy);
        model.addAttribute("selectedPlan", accessPolicy.isPremium() ? "PREMIUM" : "FREE");
        return "stock/detail";
    }

    private AccessPolicyDTO resolvePolicy(String plan) {
        if ("PREMIUM".equalsIgnoreCase(plan)) {
            return AccessPolicyDTO.premiumPlan();
        }
        return AccessPolicyDTO.freePlan();
    }

}
