<%--
================================================================
[Phase 5] - 파일 (28)번 : member/mypage.jsp
================================================================

[왜 이 파일이 28번째로 만들어지나?]

MemberController의 @GetMapping("/member/mypage")이
return "member/mypage" 를 반환하므로 이 JSP가 필요하다.
이 화면은 로그인된 사용자만 볼 수 있다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① 로그인된 사용자 정보 표시
   <p>안녕하세요, ${sessionScope.loginUser}님!</p>
   → sessionScope.loginUser = 세션에 저장된 userId 값
   → MemberController에서 session.setAttribute("loginUser", userId) 한 것

② 로그아웃 링크
   <a href="/users/logout">로그아웃</a>

③ 내 관심종목 목록 링크
   <a href="/watchlist/list">내 관심종목 보기</a>

----------------------------------------------------------------
[세션 스코프(sessionScope) 이해]

JSP에서 데이터를 꺼내는 방법:
- ${변수명}         → request scope (Controller의 model에서)
- ${sessionScope.변수명} → session scope (세션에서)
- ${param.변수명}   → URL 파라미터에서

로그인 정보는 session에 저장됐으니 sessionScope로 꺼낸다.

----------------------------------------------------------------
[Phase 5 완료 시 확인 방법]

1. 서버 실행
2. localhost:80/users/join → 가입 폼
3. 아이디/비밀번호/닉네임 입력 후 가입
4. 로그인 화면으로 이동됨
5. 아이디/비밀번호로 로그인 → 메인(/)으로 이동
6. localhost:80/member/mypage → "안녕하세요, userId님!" 출력
7. 로그아웃 클릭 → 세션 삭제 → 메인으로 이동
8. localhost:80/member/mypage 다시 접근 → 로그인 화면으로 redirect

→ 이 모든 과정이 성공하면 Phase 5 완성!

----------------------------------------------------------------
[Phase 6 예고 - SecurityConfig.java]

지금은 세션으로 직접 로그인을 관리했다.
Phase 6에서는 Spring Security가 자동으로 로그인/로그아웃/인증을 처리해준다.
SecurityConfig.java 파일 하나만 있으면 된다.

================================================================
--%>

<%-- TODO: JSP 선언 + JSTL taglib --%>
<%-- TODO: ${sessionScope.loginUser}님 환영 메시지 --%>
<%-- TODO: 로그아웃 링크 (/users/logout) --%>
<%-- TODO: 관심종목 보기 링크 (/watchlist/list) --%>
