package com.joe.stspro.home; // 생성순서 (1) HomeController.java: 첫 화면 / 주소를 index.jsp로 연결하는 Controller를 만듭니다.

import org.springframework.stereotype.Controller; // 흐름 2-2: @Controller 어노테이션 타입을 가져옵니다.

import org.springframework.web.bind.annotation.GetMapping; // 흐름 2-3: URL GET 요청과 메서드를 연결하는 GetMapping 타입을 가져옵니다.

@Controller // 흐름 2-4: Spring에게 이 클래스가 브라우저 URL 요청을 받는 Controller라고 알려줍니다.

public class HomeController { // 흐름 2-5: HomeController는 메인 화면 URL을 담당하는 클래스 타입입니다.

	@GetMapping("/") // 흐름 2-6: 브라우저가 / 주소를 요청하면 바로 아래 home() 메서드가 실행됩니다.

	public String home() { // 흐름 2-7: String 반환타입은 return 값이 JSP 위치 문자열이라는 뜻입니다.

		return "index"; // 흐름 2-8: Controller가 index를 돌려주면 /WEB-INF/views/index.jsp 화면으로 이동합니다.

	} // 흐름 2-9: home() 메서드 영역을 닫습니다.

} // 흐름 2-10: HomeController 클래스 영역을 닫습니다.
