package com.joe.java;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 자바의 큰 흐름: 클래스 생성 -> 클래스 안에 변수/메서드 작성 -> 어디선가 객체를 만들거나 메서드를 실행합니다.
// 클래스 선언 공식: 접근지정자 + class + 클래스명 + { }
// public class KosmoJoeJavaApplication 에서 public은 접근지정자, class는 클래스 선언 키워드, KosmoJoeJavaApplication은 클래스명입니다.
// 클래스명은 보통 첫 글자를 대문자로 시작합니다. 예: KosmoJoeJavaApplication, NoticeController, Test
@SpringBootApplication // Spring Boot 앱의 시작 표시입니다. "이 클래스부터 서버를 켜 주세요"라는 뜻입니다.
public class KosmoJoeJavaApplication { // 클래스 영역 시작: 이 중괄호 안에 멤버변수와 메서드를 작성할 수 있습니다.

	// 메서드 선언 공식: 접근지정자 + 그 외 지정자(static 등) + 반환타입 + 메서드명 + (매개변수) + { }
	// public static void main(String[] args) 를 보면 public=접근지정자, static=그 외 지정자, void=반환타입, main=메서드명입니다.
	// 변수와 메서드를 구분할 때는 이름 뒤의 () 소괄호를 보면 됩니다. main()처럼 ()가 있으면 메서드입니다.
	public static void main(String[] args) { // 메서드 영역 시작: 이 안에서 선언한 변수는 지역변수입니다.
		// main 메서드는 Java 프로그램의 출발점입니다.
		// SpringApplication.run(...)도 ()가 있으므로 메서드 호출입니다.
		// run 메서드를 실행하면 Tomcat 서버가 켜지고 Controller들이 URL 요청을 받을 준비를 합니다.
		SpringApplication.run(KosmoJoeJavaApplication.class, args);
	}

} // 클래스 영역 끝