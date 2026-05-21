<%--
================================================================
[Phase 5] - 파일 (26)번 : users/login.jsp
================================================================

[왜 이 파일이 26번째로 만들어지나?]

MemberController의 @GetMapping("/users/login")이
return "users/login" 을 반환하므로 이 JSP가 필요하다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① 로그인 폼
   <form action="/users/login" method="post">
     <input type="text"     name="userId"   placeholder="아이디">
     <input type="password" name="password" placeholder="비밀번호">
     <button type="submit">로그인</button>
   </form>

② 에러 메시지 출력 (로그인 실패 시)
   <c:if test="${error != null}">
     <p style="color:red;">${error}</p>
   </c:if>
   → MemberController에서 model.addAttribute("error", "...") 한 것

③ 회원가입 링크
   <a href="/users/join">회원가입</a>

----------------------------------------------------------------
[type="password" 설명]

<input type="password"> → 입력 내용이 *** 로 가려짐 (보안)
<input type="text">     → 입력 내용이 그대로 보임

----------------------------------------------------------------
[다음에 만들 파일]

→ (27)번 users/join.jsp
   이유: 회원가입 폼 화면.
   이름, 아이디, 비밀번호 입력 폼.

================================================================
--%>

<%-- TODO: JSP 선언 + JSTL taglib --%>
<%-- TODO: 로그인 폼 (action="/users/login", method="post") --%>
<%-- TODO: <input type="text" name="userId"> --%>
<%-- TODO: <input type="password" name="password"> --%>
<%-- TODO: 에러 메시지 출력 (<c:if test="${error != null}">${error}</c:if>) --%>
<%-- TODO: 회원가입 링크 (<a href="/users/join">) --%>
