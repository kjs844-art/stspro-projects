package com.joe.java.member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/*
 * ============================================================
 * MemberController - Handles /member/* URLs (join, login, mypage)
 * 
 * HttpSession: stores login state across requests.
 * When a user logs in, we save their info in the session.
 * When they log out, we remove it.
 * ============================================================
 */
@Controller
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /*
     * GET /member/join - Show registration form
     */
    @GetMapping("/join")
    public String joinForm() {
        return "users/join";  // -> /WEB-INF/views/users/join.jsp
    }

    /*
     * POST /member/join - Submit registration
     * Saves the new member to DB, then redirects to login
     */
    @PostMapping("/join")
    public String join(@ModelAttribute MemberDTO member, RedirectAttributes redirectAttributes) {
        // Assign default role if not set
        if (member.getRole() == null || member.getRole().isEmpty()) {
            member.setRole("USER");
        }
        memberService.insertMember(member);
        redirectAttributes.addFlashAttribute("message", "Registration successful! Please log in.");
        return "redirect:/member/login";
    }

    /*
     * GET /member/login - Show login form
     */
    @GetMapping("/login")
    public String loginForm() {
        return "users/login";
    }

    /*
     * POST /member/login - Process login
     * Finds user by userId, checks password, saves to session
     */
    @PostMapping("/login")
    public String login(@RequestParam String userId,
                        @RequestParam String password,
                        HttpSession session,
                        RedirectAttributes redirectAttributes) {
        MemberDTO member = memberService.selectMemberByUserId(userId);
        if (member != null && member.getPassword().equals(password)) {
            // Success: save user info in session
            session.setAttribute("loginUser", member);
            return "redirect:/";
        } else {
            // Fail: show error message
            redirectAttributes.addFlashAttribute("message", "Invalid user ID or password.");
            return "redirect:/member/login";
        }
    }

    /*
     * GET /member/logout - Log out (invalidate session)
     */
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();  // Clear all session data
        return "redirect:/";
    }

    /*
     * GET /member/mypage - Show the logged-in user's info
     * If not logged in, redirect to login
     */
    @GetMapping("/mypage")
    public String mypage(HttpSession session, Model model, RedirectAttributes redirectAttributes) {
        MemberDTO loginUser = (MemberDTO) session.getAttribute("loginUser");
        if (loginUser == null) {
            redirectAttributes.addFlashAttribute("message", "Please log in first.");
            return "redirect:/member/login";
        }
        // Fetch fresh data from DB
        MemberDTO member = memberService.selectMemberById(loginUser.getMemberId());
        model.addAttribute("member", member);
        return "member/mypage";
    }
}
