package com.joe.book.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component 
// @Component: 스프링 프레임워크에게 "이 클래스도 네가 관리하는 객체(Bean)로 만들어줘"라고 부탁하는 어노테이션입니다.
public class D7P8_LoginInterceptor implements HandlerInterceptor {

	// =====================================================
	// 🚓 인터셉터(Interceptor)란?
	// 클라이언트(웹 브라우저)의 요청이 '컨트롤러'에 도착하기 전이나 후에
	// 그 요청을 가로채서(Intercept) 특정 작업을 수행하는 역할(경찰관/검문소)을 합니다.
	// =====================================================

	// preHandle: 컨트롤러(Controller)가 실행되기 "전"에 요청을 가로채서 검사합니다.
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		// 1. 현재 접속한 사용자의 세션(Session) 정보를 가져옵니다.
		// 클라이언트(브라우저)에서 온 요청(request) 안에는 해당 브라우저만의 고유한 세션 ID가 들어있습니다.
		// 이 ID를 통해 서버에 저장된 세션 메모리 상자를 꺼내옵니다.
		HttpSession session = request.getSession();

		// 2. 세션 상자 안에 "member"라는 이름표로 저장된 데이터가 있는지 확인합니다.
		// 이 데이터는 우리가 M_D5P1_MemberController에서 로그인에 성공했을 때 
		// session.setAttribute("member", loginUser) 라고 담아두었던 바로 그 값입니다.
		Object loginUser = session.getAttribute("member");

		// 3. 만약 loginUser가 비어있다면? (즉, 로그인하지 않은 상태이거나 로그아웃 한 상태라면)
		if (loginUser == null) {
			
			// 4. 강제로 로그인 페이지로 쫓아냅니다 (리다이렉트).
			// response 객체를 사용해 클라이언트 브라우저에게 "여기로 다시 접속해!" 라고 명령을 보냅니다.
			// request.getContextPath()는 기본 경로를 의미하며, 그 뒤에 "/member/login"을 붙여 이동시킵니다.
			response.sendRedirect(request.getContextPath() + "/member/login");
			
			// 5. false를 반환합니다.
			// 인터셉터에서 false를 반환하면? 
			// 원래 가려고 했던 목적지(예: D5P1_BookController의 insert 등)로 더 이상 진행하지 않고,
			// 여기서 딱 흐름을 끊어버립니다 (통행 금지).
			return false;
		}

		// 6. 만약 loginUser가 존재한다면? (정상적으로 로그인한 회원이라면)
		// true를 반환합니다.
		// 인터셉터에서 true를 반환하면? "검문 통과"를 의미합니다.
		// 사용자가 원래 가려고 했던 컨트롤러로 무사히 넘어가게 됩니다 (무사 통과).
		return true;
	}
}

