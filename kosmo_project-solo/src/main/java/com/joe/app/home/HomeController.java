package com.joe.app.home;

/*
 * ================================================================
 * [Phase 1] - 파일 (4)번 : HomeController.java
 * ================================================================
 *
 * [왜 이 파일이 4번째로 만들어지나?]
 *
 * Spring Boot가 실행되면 브라우저에서 "/" 주소를 입력했을 때
 * 누군가 요청을 받아서 어떤 화면을 보여줄지 결정해야 한다.
 * 그 역할을 하는 파일이 바로 Controller이다.
 *
 * build.gradle(1) → application.properties(2) → Application.java(3)
 * 이 3개가 Spring Boot의 심장(설정/시작)이라면,
 * HomeController는 첫 번째 "문지기" 역할이다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Controller 어노테이션
 *    → Spring에게 "이 클래스는 웹 요청을 처리하는 Controller야" 라고 알려준다
 *    → 없으면 Spring이 이 클래스를 무시함
 *
 * ② @GetMapping("/") 어노테이션
 *    → 브라우저에서 "/" 주소로 GET 요청이 오면 아래 메서드를 실행하라는 뜻
 *    → "GET"은 주소창에 URL을 치고 엔터 누르는 행위
 *
 * ③ public String home() 메서드
 *    → return "index"; 가 핵심
 *    → application.properties에 설정된 prefix(/WEB-INF/views/) + "index" + suffix(.jsp)
 *    → 즉 /WEB-INF/views/index.jsp 파일을 화면으로 보여준다
 *
 * ----------------------------------------------------------------
 * [데이터 흐름]
 *
 * 브라우저 → "/" 요청
 *   ↓
 * HomeController.home() 실행
 *   ↓
 * return "index"
 *   ↓
 * /WEB-INF/views/index.jsp 화면 출력
 *
 * ----------------------------------------------------------------
 * [이 파일 다음에 만들어야 할 파일]
 *
 * → (5)번 index.jsp
 *    이유: Controller가 "index"를 반환해도 실제 index.jsp 파일이
 *    없으면 404 에러가 난다. 반드시 JSP를 만들어줘야 한다.
 *
 * ================================================================
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

}
