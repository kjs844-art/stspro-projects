package com.joe.fin.etf;

import com.joe.fin.member.AccessPolicyDTO;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ETFController {
    private final ETFService etfService;

    public ETFController(ETFService etfService) {
        this.etfService = etfService;
    }

    @GetMapping("/etfs")
    public String searchForm() {
        return "etf/search";
    }

    @GetMapping("/etfs/search")
    public String search(@RequestParam(defaultValue = "QQQ") String ticker,
                         @RequestParam(defaultValue = "FREE") String plan,
                         Model model) {
        String cleanTicker = ticker.trim().toUpperCase();
        AccessPolicyDTO accessPolicy = resolvePolicy(plan);
        ETFDTO etf = etfService.getEtfData(cleanTicker);
        etf.setTopHoldings(etf.getTopHoldings()
            .stream()
            .limit(accessPolicy.getEtfHoldingLimit())
            .toList());

        model.addAttribute("etf", etf);
        model.addAttribute("accessPolicy", accessPolicy);
        model.addAttribute("selectedPlan", accessPolicy.isPremium() ? "PREMIUM" : "FREE");
        return "etf/detail";
    }

    private AccessPolicyDTO resolvePolicy(String plan) {
        if ("PREMIUM".equalsIgnoreCase(plan)) {
            return AccessPolicyDTO.premiumPlan();
        }
        return AccessPolicyDTO.freePlan();
    }

}
