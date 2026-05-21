package com.joe.biostock.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/")
	public String home() {
		// 처음 접속하면 바이오/주식 신호 목록 화면으로 이동합니다.
		return "redirect:/radar/list";
	}
}
