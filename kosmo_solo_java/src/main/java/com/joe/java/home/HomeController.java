package com.joe.java.home;

import com.joe.java.member.MemberDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/*
 * ============================================================
 * HomeController - Main page ("/")
 * 
 * The root URL shows the index page.
 * We also pass the login user info if someone is logged in,
 * so the JSP can show "Welcome, username!" or "Login" link.
 * ============================================================
 */
@Controller
public class HomeController {

    @GetMapping("/")
    public String home(HttpSession session, Model model) {
        // Check if user is logged in by reading session attribute
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        if (loginUser != null) {
            model.addAttribute("loginUser", loginUser);
        }
        return "index";
    }
}
