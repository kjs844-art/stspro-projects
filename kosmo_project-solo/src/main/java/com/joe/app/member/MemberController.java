package com.joe.app.member;

/*
 * ================================================================
 * [Phase 5] - 파일 (25)번 : MemberController.java
 * ================================================================
 *
 * [왜 이 파일이 25번째로 만들어지나?]
 *
 * MemberService(24번)가 준비됐으니, 이제 로그인/가입/마이페이지
 * URL 요청을 받아서 Service를 호출하는 Controller를 만든다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Controller + 생성자 주입 (MemberService)
 *
 * ② @GetMapping("/users/login")
 *    → 로그인 화면 열기
 *    → return "users/login"
 *
 * ③ @PostMapping("/users/login")  ← 로그인 처리
 *    → 폼에서 userId, password 받기
 *    → memberService.login(userId, password) 호출
 *    → 성공: session.setAttribute("loginUser", userId) → redirect:/
 *    → 실패: model.addAttribute("error", "아이디 또는 비밀번호 오류") → 로그인 화면 다시
 *
 * ④ @GetMapping("/users/join")
 *    → 회원가입 화면 열기
 *    → return "users/join"
 *
 * ⑤ @PostMapping("/users/join")  ← 회원가입 처리
 *    → 폼에서 MemberDTO 받기
 *    → memberService.join(dto) 호출
 *    → redirect:/users/login  (가입 후 로그인 화면으로)
 *
 * ⑥ @GetMapping("/member/mypage")
 *    → 세션에서 loginUser 확인
 *    → loginUser가 없으면 → redirect:/users/login (비로그인 접근 차단)
 *    → 있으면 → return "member/mypage"
 *
 * ⑦ @GetMapping("/users/logout")
 *    → session.invalidate() → 세션 삭제
 *    → redirect:/ (메인으로)
 *
 * ----------------------------------------------------------------
 * [HttpSession 주입 방법]
 *
 * 방법1: 메서드 파라미터로 받기 (권장)
 *   public String login(String userId, String password,
 *                       HttpSession session, Model model)
 *
 * 방법2: HttpServletRequest에서 꺼내기
 *   public String login(HttpServletRequest request)
 *   → HttpSession session = request.getSession();
 *
 * ----------------------------------------------------------------
 * [로그인 상태 확인 흐름]
 *
 * 마이페이지 접근 시:
 *   String loginUser = (String) session.getAttribute("loginUser");
 *   if (loginUser == null) → 미로그인 → 로그인 페이지로 redirect
 *   if (loginUser != null) → 로그인됨 → 마이페이지 보여줌
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (26)번 users/login.jsp
 *    이유: return "users/login" 대응 JSP.
 *    로그인 폼 + 에러 메시지 출력.
 *
 * ================================================================
 */

// TODO: import org.springframework.stereotype.Controller;
// TODO: import org.springframework.ui.Model;
// TODO: import org.springframework.web.bind.annotation.*;
// TODO: import jakarta.servlet.http.HttpSession;

// TODO: @Controller 어노테이션

public class MemberController {

    // TODO: private final MemberService memberService; + 생성자

    // TODO: @GetMapping("/users/login")  → login.jsp 반환
    // TODO: @PostMapping("/users/login") → 로그인 처리, 세션 저장, redirect
    // TODO: @GetMapping("/users/join")   → join.jsp 반환
    // TODO: @PostMapping("/users/join")  → 가입 처리, redirect
    // TODO: @GetMapping("/member/mypage")→ 세션 확인 후 mypage.jsp 반환
    // TODO: @GetMapping("/users/logout") → session.invalidate(), redirect

}
