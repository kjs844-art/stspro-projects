package com.example.joe.member;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {
	
	// 공식: URL -> 메서드명() -> return JSP 경로
	@GetMapping("/member/mypage")
	public String mypage() {
		return "member/mypage";
	}

	// 예외: URL은 /member/login, JSP는 users/login.jsp
	@GetMapping("/member/login")
	public String login() {
		return "users/login";
	}
	
	// 예외: URL은 /member/join, JSP는 users/join.jsp
	@GetMapping("/member/join")
	public String join() {
		return "users/join";
	}
}