package com.joe.stspro.member; // 생성순서 (2) MemberController.java: 회원 화면 URL을 member/users JSP로 연결하는 Controller를 만듭니다.

import org.springframework.stereotype.Controller; // 흐름 3-2: @Controller 어노테이션 타입을 가져옵니다.

import org.springframework.web.bind.annotation.GetMapping; // 흐름 3-3: 브라우저 GET URL과 메서드를 연결하는 타입입니다.

@Controller // 흐름 3-4: Spring에게 이 클래스가 회원 관련 URL을 처리하는 Controller라고 알려줍니다.

public class MemberController { // 흐름 3-5: MemberController는 member URL들을 담당하는 클래스 타입입니다.

	@GetMapping("/member/mypage") // 흐름 3-6: /member/mypage 요청이 들어오면 아래 mypage() 메서드가 실행됩니다.

	public String mypage() { // 흐름 3-7: String 반환타입은 return 값이 JSP 경로 문자열이라는 뜻입니다.

		return "member/mypage"; // 흐름 3-8: /WEB-INF/views/member/mypage.jsp 화면을 보여주라는 뜻입니다.

	} // 흐름 3-9: mypage() 메서드 영역을 닫습니다.

	@GetMapping("/member/login") // 흐름 3-10: /member/login 요청이 들어오면 아래 login() 메서드가 실행됩니다.

	public String login() { // 흐름 3-11: login은 메서드명이고, ()가 있으므로 실행 기능입니다.

		return "users/login"; // 흐름 3-12: URL은 member지만 JSP는 /WEB-INF/views/users/login.jsp로 연결됩니다.

	} // 흐름 3-13: login() 메서드 영역을 닫습니다.

	@GetMapping("/member/join") // 흐름 3-14: /member/join 요청이 들어오면 아래 join() 메서드가 실행됩니다.

	public String join() { // 흐름 3-15: join은 회원가입 화면으로 보내는 Controller 메서드입니다.

		return "users/join"; // 흐름 3-16: URL은 member지만 JSP는 /WEB-INF/views/users/join.jsp로 연결됩니다.

	} // 흐름 3-17: join() 메서드 영역을 닫습니다.

} // 흐름 3-18: MemberController 클래스 영역을 닫습니다.
