package com.joe.fin.member;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {
    @GetMapping("/members/plans")
    public String plans(Model model) {
        model.addAttribute("freePlan", AccessPolicyDTO.freePlan());
        model.addAttribute("premiumPlan", AccessPolicyDTO.premiumPlan());
        return "member/plans";
    }

}
