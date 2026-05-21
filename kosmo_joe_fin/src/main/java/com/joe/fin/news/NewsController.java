package com.joe.fin.news;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class NewsController {
	private final NewsService newsService;

	public NewsController(NewsService newsService) {
		this.newsService = newsService;
	}

	@GetMapping("/news")
	public String list(@RequestParam(defaultValue = "NVDA") String symbol, Model model) {
		String cleanSymbol = symbol.trim().toUpperCase();
		model.addAttribute("symbol", cleanSymbol);
		model.addAttribute("newsList", newsService.findBySymbol(cleanSymbol));
		return "news/list";
	}

}
