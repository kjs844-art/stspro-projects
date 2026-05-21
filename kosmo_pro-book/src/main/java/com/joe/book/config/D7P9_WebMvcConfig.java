package com.joe.book.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.joe.book.interceptor.D7P8_LoginInterceptor; // interceptor 패키지에서 가져오도록 추가

@Configuration 
// @Configuration: 이 클래스가 스프링 프로젝트 전체의 '환경 설정(Config)'을 담당하는 클래스임을 스프링에게 알려줍니다.
// 스프링이 켜질 때 이 클래스를 읽고 설정들을 세팅합니다.
public class D7P9_WebMvcConfig implements WebMvcConfigurer {

	// =====================================================
	// ⚙️ WebMvcConfigurer 란?
	// 스프링 웹 MVC의 설정을 우리 입맛에 맞게 고치거나 추가할 때 사용하는 인터페이스입니다.
	// 인터셉터를 등록하거나, 파일 업로드 경로를 설정하는 등 다양한 웹 설정이 가능합니다.
	// =====================================================

	@Autowired
	// 의존성 주입(DI): 아까 @Component로 등록해둔 D7P8_LoginInterceptor 객체(우리의 경찰관)를
	// 스프링이 알아서 찾아서 이 변수에 쏙 넣어줍니다.
	private D7P8_LoginInterceptor loginInterceptor;

	// addInterceptors: 인터셉터를 등록하기 위해 WebMvcConfigurer에서 제공하는 메서드를 재정의(Override) 합니다.
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		// 1. 우리가 만든 loginInterceptor(경찰관)를 스프링의 인터셉터 명단(registry)에 정식으로 등록합니다.
		registry.addInterceptor(loginInterceptor)
		
		// 2. addPathPatterns(): 어떤 길(URL)로 갈 때 이 경찰관이 검문을 할 것인지 정합니다 (적용할 주소).
		// 게시판(책 목록) 조회는 누구나 볼 수 있어야 하니까 제외하고, 
		// 책을 등록, 수정, 삭제하는 위험하고 중요한 행동들은 오직 "로그인한 사람"만 할 수 있도록
		// 이 5개의 주소들만 콕 집어서 검문소로 지정합니다.
		.addPathPatterns(
			"/book/insertForm", // 새 책 등록 화면 띄워달라는 요청
			"/book/insert",     // 새 책 내용 다 적고 "저장!"(DB에 인서트) 해달라는 요청
			"/book/updateForm", // 책 내용 수정 화면 띄워달라는 요청
			"/book/update",     // 책 수정한 거 "적용!"(DB에 업데이트) 해달라는 요청
			"/book/delete"      // 책 지워달라는 요청
		);
		
		// (참고) 만약 모든 곳을 다 막고 특정 페이지만 열어주고 싶다면
		// registry.addInterceptor(loginInterceptor).addPathPatterns("/**").excludePathPatterns("/member/loginForm", "/books/list"); 
		// 이런 식으로 excludePathPatterns(예외 경로)를 사용할 수도 있습니다.
		// 하지만 지금은 딱 방어해야 할 곳만 정교하게 지정하는 방식을 사용했습니다.
	}
}

