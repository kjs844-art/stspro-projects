package com.example.joe.qna;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class QnaController {
	
	// URL: /qna/list -> 메서드: list() -> JSP: qna/list.jsp
	@GetMapping("/qna/list")
	public String list() {
		return "qna/list";
	}

	// URL: /board/add -> 메서드: add() -> JSP: board/add.jsp
	@GetMapping("/board/add")
	public String add() {
		return "board/add";
	}
	
	// URL: /board/detail -> 메서드: detail() -> JSP: board/detail.jsp
	@GetMapping("/board/detail")
	public String detail() {
		return "board/detail";
	}
}