package com.joe.fin.shadow;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ShadowRiskController {
    private final ShadowRiskService shadowRiskService;

    public ShadowRiskController(ShadowRiskService shadowRiskService) {
        this.shadowRiskService = shadowRiskService;
    }

    @GetMapping("/shadow-risk")
    public String detail(@RequestParam(defaultValue = "semiconductor") String keyword, Model model) {
        model.addAttribute("risk", shadowRiskService.analyze(keyword));
        return "shadow/detail";
    }
}
