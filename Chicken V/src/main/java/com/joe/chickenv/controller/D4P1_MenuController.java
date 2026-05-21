package com.joe.chickenv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // 📌 추가: Model 도구 가져오기
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam; // 📌 추가: 파라미터 도구 가져오기

import com.joe.chickenv.mapper.D2P4_MenuMapper; // 📌 추가: Mapper 인터페이스 연결

@Controller
public class D4P1_MenuController {
	
    // 📌 @Autowired로 스프링에게 Mapper를 연결해달라고 부탁합니다.
	@Autowired
	private D2P4_MenuMapper menuMapper; 
	
	@GetMapping("/menu") // 브라우저 주소: localhost:8080/menu
	public String getMenuList(
            @RequestParam(value="category", defaultValue="") String category, // 📌 카테고리 값 받기
            Model model) {
		
        // 1. DB에서 (카테고리에 맞는) 메뉴 리스트를 가져옵니다.
        // 2. "menus"라는 이름으로 JSP에 데이터를 전달합니다.
		model.addAttribute("menus", menuMapper.getMenuList(category));
        
		return "menu"; // 📌 JSP 파일 이름인 'menu'와 똑같이 맞춰줍니다.
	}
}
