package com.joe.java;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

// war 파일로 배포할 때 필요한 보조 시작 클래스입니다.
// 이 클래스도 public class ServletInitializer { } 형태의 클래스 선언입니다.
public class ServletInitializer extends SpringBootServletInitializer { // extends는 부모 클래스 기능을 물려받는다는 뜻입니다.

	@Override // 부모 클래스의 메서드를 내 프로젝트에 맞게 다시 작성했다는 표시입니다.
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) { // configure 뒤에 ()가 있으므로 메서드입니다.
		// application은 메서드의 매개변수입니다. 매개변수도 메서드 안에서 사용할 수 있는 지역변수처럼 생각하면 됩니다.
		// application.sources(...)도 ()가 있으므로 메서드 호출입니다.
		return application.sources(KosmoJoeJavaApplication.class);
	}

}