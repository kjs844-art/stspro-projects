package com.joe.book.filter;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

@Component
// @Component: 스프링에게 "이 클래스도 빈(Bean)으로 만들어서 관리해줘"라고 요청합니다.
// Filter에 @Component를 붙이면 스프링 부트가 알아서 모든 요청에 대해 이 필터를 적용합니다.
public class D7P9_LogFilter implements Filter {

	// =====================================================
	// 🚰 필터(Filter)란?
	// 클라이언트의 요청이 스프링(DispatcherServlet)에 도달하기조차 전에, 
	// 가장 맨 앞단에서 요청을 걸러내거나(필터링), 로깅, 인코딩 처리 등을 하는 문지기 역할입니다.
	// 인터셉터보다 더 앞단에서 실행됩니다!
	// =====================================================

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// 필터가 처음 생성될 때 실행되는 초기화 메서드 (보통 비워둡니다)
		System.out.println("====== D7P9_LogFilter 문지기 배치 완료 ======");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		// 1. 요청(Request) 정보 분석하기
		// 범용적인 ServletRequest를 우리가 자주 쓰는 HttpServletRequest로 형변환합니다.
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String requestURI = httpRequest.getRequestURI(); // 사용자가 어디로 접속했는지 주소 확인
		
		// 2. 컨트롤러(내부)로 넘어가기 전 (전처리)
		System.out.println("[필터 로그 - 들어옴] ➡️ 요청 주소: " + requestURI);
		
		// 3. 체인(Chain) 연결
		// 문지기가 검사를 끝냈으니, 다음 문지기(필터)나 컨트롤러 쪽으로 통과시켜주는 코드입니다.
		// 이 한 줄이 없으면 요청이 여기서 꽉 막혀서 하얀 화면만 뜹니다! (매우 중요)
		chain.doFilter(request, response);
		
		// 4. 컨트롤러(내부)에서 처리가 다 끝나고 브라우저로 나가기 전 (후처리)
		// System.out.println("[필터 로그 - 나감] ⬅️ 응답 완료: " + requestURI);
	}

	@Override
	public void destroy() {
		// 톰캣(서버)이 꺼질 때 필터가 사라지며 실행되는 메서드 (보통 비워둡니다)
	}

}

