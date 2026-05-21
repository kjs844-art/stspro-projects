package com.joe.stspro; // 흐름 1-10: 이 파일이 com/joe/stspro 기본 패키지 소속이라는 뜻입니다.

import org.springframework.boot.builder.SpringApplicationBuilder; // 흐름 1-11: WAR 배포 때 시작 정보를 만드는 SpringApplicationBuilder 타입입니다.

import org.springframework.boot.web.servlet.support.SpringBootServletInitializer; // 흐름 1-12: WAR 배포용 부모 클래스 타입입니다.

public class ServletInitializer extends SpringBootServletInitializer { // 흐름 1-13: ServletInitializer가 부모 클래스 기능을 상속받는다는 뜻입니다.

	@Override // 흐름 1-14: 부모가 가진 configure() 메서드를 이 프로젝트에 맞게 다시 작성한다는 표시입니다.

	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) { // 흐름 1-15: configure는 WAR 배포 시작 클래스를 지정하는 메서드입니다.

		return application.sources(KosmoJoeStsproApplication.class); // 흐름 1-16: KosmoJoeStsproApplication을 시작 클래스로 등록해서 돌려줍니다.

	} // 흐름 1-17: configure() 메서드 영역을 닫습니다.

} // 흐름 1-18: ServletInitializer 클래스 영역을 닫습니다.
