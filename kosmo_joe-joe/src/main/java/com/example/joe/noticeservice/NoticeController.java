package com.example.joe.noticeservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/*
 * [Java 공식]
 * Java = 클래스 + 변수 + 메서드
 * 클래스 선언 = 접근지정자 + class + 클래스명 + { }
 * 메서드 선언 = 접근지정자 + 반환타입 + 메서드명() + { }
 * 변수와 메서드 구분 = 이름 뒤에 ()가 있으면 메서드, 없으면 변수
 *
 * [Spring 흐름]
 * @Controller = 이 클래스가 URL 요청을 받는 역할이라고 Spring에게 알려줌
 * @Autowired = Spring이 만든 객체를 변수에 넣어 줌. 이것을 주입(injection)이라고 생각하면 됨
 */
@Controller
public class NoticeController {
	
	// 멤버변수 공식 = 접근지정자 + 데이터타입 + 변수명
	// private NoticeService output = NoticeService 타입의 output 변수
	@Autowired
	private NoticeService output;
	
	/*
	 * [Java 데이터가 JSP에 출력되는 흐름]
	 * 1. 브라우저가 /notice/list 요청
	 * 2. Controller의 list() 메서드 실행
	 * 3. output.list()로 Service에게 데이터 생성을 위임
	 * 4. Service가 NoticeDTO 객체에 데이터를 담아 return
	 * 5. Controller가 Model에 dto를 "output"이라는 이름으로 담음
	 * 6. return "notice/list"가 /WEB-INF/views/notice/list.jsp로 이동
	 * 7. JSP에서 ${output.variable}, ${output.number}로 출력
	 */
	@GetMapping("/notice/list")
	public String list(Model model) {
		// 공식: 데이터타입 변수명 = 오른쪽 결과값
		// NoticeDTO dto = output.list();
		// output.list() 결과값을 dto 변수에 대입합니다.
		NoticeDTO dto = output.list();
		
		// 공식: model.addAttribute("JSP에서 부를 이름", 실제 데이터)
		// a = b 느낌으로 보면, output 이름 = dto 데이터 입니다.
		model.addAttribute("output", dto);
		
		System.out.println(dto.getVariable());
		System.out.println(dto.getNumber());
		
		return "notice/list";
	}
	
	// URL: /notice/add -> 메서드: add() -> JSP: notice/add.jsp
	@GetMapping("/notice/add")
	public String add() {
		return "notice/add";
	}
	
	/*
	 * detail도 list와 같은 흐름입니다.
	 * /notice/detail -> detail() -> output.detail() -> Model -> notice/detail.jsp
	 */
	@GetMapping("/notice/detail")
	public String detail(Model model) {
		NoticeDTO dto = output.detail();
		model.addAttribute("output", dto);
		
		return "notice/detail";
	}
	
}