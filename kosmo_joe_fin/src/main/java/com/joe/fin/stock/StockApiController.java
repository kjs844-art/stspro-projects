package com.joe.fin.stock;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stocks")
public class StockApiController {
	private final StockService stockService;

	public StockApiController(StockService stockService) {
		this.stockService = stockService;
	}

	@GetMapping("/{ticker}")
	public Map<String, Object> detail(@PathVariable String ticker) {
		StockDTO stock = stockService.getStockData(ticker.trim().toUpperCase());
		Map<String, Object> response = new HashMap<>();
		response.put("ticker", stock.getTicker());
		response.put("companyName", stock.getCompanyName());
		response.put("currentPrice", stock.getCurrentPrice());
		response.put("changePercent", stock.getChangePercent());
		response.put("industry", stock.getIndustry());
		response.put("updatedAt", LocalDateTime.now().toString());
		return response;
	}
}
