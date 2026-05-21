package com.joe.stspro.noticeservice; // 생성순서 (5) NoticeController.java: URL 요청을 받고 Service 데이터를 Model에 담아 JSP로 보내는 Controller를 만듭니다.

import java.util.List; // 흐름 6-2: Service에서 받은 NoticeDTO 여러 개를 List 타입으로 받기 위해 가져옵니다.

import org.springframework.beans.factory.annotation.Autowired; // 흐름 6-3: Spring이 만든 Service 객체를 변수에 자동으로 넣기 위해 가져옵니다.

import org.springframework.stereotype.Controller; // 흐름 6-4: @Controller 어노테이션 타입을 가져옵니다.

import org.springframework.ui.Model; // 흐름 6-5: Model은 Java 데이터를 JSP까지 들고 가는 Spring의 데이터 전달 상자 타입입니다.

import org.springframework.web.bind.annotation.GetMapping; // 흐름 6-6: URL 요청과 메서드를 연결하는 GetMapping 타입을 가져옵니다.

@Controller // 흐름 6-7: Spring에게 이 클래스가 notice URL 요청을 받는 Controller라고 알려줍니다.

public class NoticeController { // 흐름 6-8: NoticeController는 notice URL과 JSP 이동을 담당하는 클래스입니다.

	@Autowired // 흐름 6-9: Spring이 NoticeService 객체를 만들어 아래 output 변수에 자동으로 넣어줍니다.

	private NoticeService output; // 흐름 6-10: NoticeService는 데이터 타입이고, output은 Service 객체를 담는 멤버변수입니다.

	@GetMapping("/notice/list") // 흐름 6-11: 브라우저가 /notice/list를 요청하면 아래 list() 메서드가 실행됩니다.

	public String list(Model model) { // 흐름 6-12: 앞 Model은 데이터 타입, 뒤 model은 변수명이며, 대문자 타입으로 소문자 변수를 선언한 것입니다.

		List<NoticeDTO> dto = output.list(); // 흐름 6-13: output은 NoticeService 변수이고, 점(.)은 output 안의 list() 메서드를 호출한다는 뜻입니다.

		model.addAttribute("output", dto); // 흐름 6-14: model 변수 안의 addAttribute() 메서드로 dto를 output이라는 이름표를 붙여 JSP로 보냅니다.

		return "notice/list"; // 흐름 6-15: /WEB-INF/views/notice/list.jsp 화면으로 이동합니다.

	} // 흐름 6-16: list() 메서드 영역을 닫습니다.

	@GetMapping("/notice/add") // 흐름 6-17: 브라우저가 /notice/add를 요청하면 아래 add() 메서드가 실행됩니다.

	public String add() { // 흐름 6-18: add()는 데이터 없이 notice/add.jsp 화면만 보여주는 메서드입니다.

		return "notice/add"; // 흐름 6-19: /WEB-INF/views/notice/add.jsp 화면으로 이동합니다.

	} // 흐름 6-20: add() 메서드 영역을 닫습니다.

	@GetMapping("/notice/detail") // 흐름 6-21: 브라우저가 /notice/detail을 요청하면 아래 detail() 메서드가 실행됩니다.

	public String detail(Model model) { // 흐름 6-22: Model은 Spring이 주는 타입이고 model은 내가 메서드 안에서 쓰는 변수명입니다.

		NoticeDTO dto = output.detail(); // 흐름 6-23: 점(.)은 output 객체 안으로 들어가 detail() 메서드를 실행하라는 뜻입니다.

		model.addAttribute("input", dto); // 흐름 6-24: "input"은 JSP에서 부를 이름이고, dto는 실제로 JSP에 전달되는 Java 데이터입니다.

		return "notice/detail"; // 흐름 6-25: /WEB-INF/views/notice/detail.jsp 화면으로 이동합니다.

	} // 흐름 6-26: detail() 메서드 영역을 닫습니다.

} // 흐름 6-27: NoticeController 클래스 영역을 닫습니다.
