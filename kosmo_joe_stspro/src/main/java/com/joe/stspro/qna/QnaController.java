package com.joe.stspro.qna; // 생성순서 (6) QnaController.java: qna/board 연습 URL을 JSP로 연결하는 Controller를 만듭니다.

import org.springframework.stereotype.Controller; // 흐름 8-2: @Controller 어노테이션 타입을 가져옵니다.

import org.springframework.web.bind.annotation.GetMapping; // 흐름 8-3: URL 요청과 메서드를 연결하는 GetMapping 타입을 가져옵니다.

@Controller // 흐름 8-4: Spring에게 이 클래스가 QnA와 board URL 요청을 처리한다고 알려줍니다.

public class QnaController { // 흐름 8-5: QnaController는 qna/board 연습 URL을 담당하는 클래스입니다.

	@GetMapping("/qna/list") // 흐름 8-6: 브라우저가 /qna/list를 요청하면 아래 list() 메서드가 실행됩니다.

	public String list() { // 흐름 8-7: String 반환타입은 return 값이 JSP 경로 문자열이라는 뜻입니다.

		return "qna/list"; // 흐름 8-8: /WEB-INF/views/qna/list.jsp 화면으로 이동하려는 코드입니다.

	} // 흐름 8-9: list() 메서드 영역을 닫습니다.

	@GetMapping("/board/add") // 흐름 8-10: 브라우저가 /board/add를 요청하면 아래 add() 메서드가 실행됩니다.

	public String add() { // 흐름 8-11: add()는 board/add.jsp 화면을 보여주는 메서드입니다.

		return "board/add"; // 흐름 8-12: /WEB-INF/views/board/add.jsp 화면으로 이동합니다.

	} // 흐름 8-13: add() 메서드 영역을 닫습니다.

	@GetMapping("/board/detail") // 흐름 8-14: 브라우저가 /board/detail을 요청하면 아래 detail() 메서드가 실행됩니다.

	public String detail() { // 흐름 8-15: detail()은 board/detail.jsp 화면을 보여주는 메서드입니다.

		return "board/detail"; // 흐름 8-16: /WEB-INF/views/board/detail.jsp 화면으로 이동합니다.

	} // 흐름 8-17: detail() 메서드 영역을 닫습니다.

} // 흐름 8-18: QnaController 클래스 영역을 닫습니다.
