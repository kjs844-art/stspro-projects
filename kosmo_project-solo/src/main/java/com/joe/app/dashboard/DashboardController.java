package com.joe.app.dashboard;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.joe.app.clinical.ClinicalDTO;
import com.joe.app.clinical.ClinicalService;
import com.joe.app.stock.StockDTO;
import com.joe.app.stock.StockService;
import com.joe.app.watchlist.WatchlistDTO;
import com.joe.app.watchlist.WatchlistService;

@Controller
public class DashboardController {

    private final StockService stockService;
    private final ClinicalService clinicalService;
    private final WatchlistService watchlistService;

    public DashboardController(
        StockService stockService,
        ClinicalService clinicalService,
        WatchlistService watchlistService
    ) {
        this.stockService = stockService;
        this.clinicalService = clinicalService;
        this.watchlistService = watchlistService;
    }

    @GetMapping("/dashboard")
    public String dashboard(@RequestParam(required = false) String ticker, Model model) {
        String selectedTicker = ticker == null || ticker.isBlank() ? "PFE" : ticker.trim().toUpperCase();

        StockDTO stock = stockService.getStockData(selectedTicker);
        List<ClinicalDTO> trials = clinicalService.searchTrials(stock.getCompanyName());
        List<WatchlistDTO> watchlist = watchlistService.getList();

        model.addAttribute("ticker", selectedTicker);
        model.addAttribute("stock", stock);
        model.addAttribute("trials", trials);
        model.addAttribute("watchlist", watchlist);

        return "dashboard/index";
    }
}
