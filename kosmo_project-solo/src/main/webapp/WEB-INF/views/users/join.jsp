<%--
================================================================
[Phase 5] - 파일 (27)번 : users/join.jsp
================================================================

[왜 이 파일이 27번째로 만들어지나?]

MemberController의 @GetMapping("/users/join")이
return "users/join" 을 반환하므로 이 JSP가 필요하다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① 회원가입 폼
   <form action="/users/join" method="post">
     <input type="text"     name="userId"   placeholder="아이디">
     <input type="password" name="password" placeholder="비밀번호">
     <input type="text"     name="nickname" placeholder="닉네임">
     <button type="submit">가입하기</button>
   </form>

② 폼 필드명과 MemberDTO 필드명 일치 확인
   name="userId"   → MemberDTO.userId
   name="password" → MemberDTO.password
   name="nickname" → MemberDTO.nickname

③ 로그인 화면으로 돌아가기 링크
   <a href="/users/login">이미 계정이 있어요</a>

----------------------------------------------------------------
[Phase 5 전체 흐름 요약]

[회원가입]
join.jsp 폼 제출 (POST)
  ↓
MemberController.join(MemberDTO dto)
  ↓
memberService.join(dto)
  ↓
BCrypt.encode(dto.getPassword()) → dto에 암호화값으로 교체
  ↓
memberMapper.insert(dto) → DB에 저장
  ↓
redirect:/users/login

[로그인]
login.jsp 폼 제출 (POST)
  ↓
MemberController.login(userId, password, session)
  ↓
memberService.login(userId, password)
  ↓
memberMapper.findByUserId(userId) → MemberDTO 조회
  ↓
BCrypt.matches(password, dto.getPassword()) → 비교
  ↓
성공: session.setAttribute("loginUser", userId) → redirect:/
실패: model.addAttribute("error", "오류 메시지") → login.jsp

----------------------------------------------------------------
[다음에 만들 파일]

→ (28)번 member/mypage.jsp
   이유: 로그인 후 마이페이지 화면.
   세션에서 로그인 정보를 꺼내서 표시.
   Phase 5의 마지막 JSP.

================================================================
--%>

<%-- TODO: JSP 선언 --%>
<%-- TODO: 회원가입 폼 (action="/users/join", method="post") --%>
<%-- TODO: <input name="userId">, <input name="password">, <input name="nickname"> --%>
<%-- TODO: 로그인으로 돌아가기 링크 --%>
