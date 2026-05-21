package com.joe.book.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.joe.book.model.M_D1P2_MemberDTO;
import com.joe.book.service.M_D3P3_MemberService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

// 이 클래스는 회원(Member)과 관련된 사용자의 요청(주소 접속)을 받아들이는 창구 역할을 합니다.
@Controller // 스프링에게 "이 클래스는 웹 요청을 처리하는 컨트롤러야!"라고 알려줍니다.
@RequestMapping("/member") // 이 컨트롤러의 모든 메서드는 기본적으로 "/member"로 시작하는 주소를 처리하게 됩니다.
@RequiredArgsConstructor // final이 붙은 필드를 위한 생성자를 자동으로 만들어줍니다. (의존성 주입)
public class M_D5P1_MemberController {

    // 컨트롤러는 서비스(Step3_MemberService)에게 실제 작업을 지시합니다.
    private final M_D3P3_MemberService memberService;

    // ==========================================
    // 1. 회원가입 화면 열기
    // ==========================================
    // 사용자가 GET 방식으로 /member/join 주소를 입력하고 들어오면 실행됩니다.
    @GetMapping("/join")
    public String joinForm() {
        // WEB-INF/views/member/M_D6P0_joinForm.jsp 파일을 화면에 띄워줍니다.
        return "member/M_D6P0_joinForm";
    }

    // ==========================================
    // 2. 회원가입 처리 (DB에 저장)
    // ==========================================
    // 화면에서 사용자가 <form method="post"> 로 "가입하기" 버튼을 눌렀을 때 실행됩니다.
    @PostMapping("/join")
    public String join(M_D1P2_MemberDTO memberDTO) throws Exception {
        // 사용자가 입력한 아이디, 비밀번호 등이 담긴 memberDTO를 서비스로 넘겨서 DB에 저장시킵니다.
        memberService.join(memberDTO);
        
        // 회원가입이 끝났으니, 다시 로그인 화면으로 돌아가도록 지시합니다. (redirect: 주소 이동)
        return "redirect:/member/login";
    }

    // ==========================================
    // 3. 로그인 화면 열기
    // ==========================================
    // 사용자가 GET 방식으로 /member/login 주소를 입력하면 실행됩니다.
    @GetMapping("/login")
    public String loginForm() {
        // WEB-INF/views/member/M_D6P0_loginForm.jsp 파일을 띄워줍니다.
        return "member/M_D6P0_loginForm";
    }

    // ==========================================
    // 4. 로그인 처리 (세션에 정보 저장 + 쿠키 설정)
    // ==========================================
    // 사용자가 로그인 폼에서 아이디/비번을 입력하고 제출했을 때 실행됩니다.
    @PostMapping("/login")
    public String login(M_D1P2_MemberDTO memberDTO, String rememberId, HttpSession session, HttpServletResponse response) throws Exception {
        
        // DB에 해당 아이디/비밀번호가 맞는지 물어보고, 맞다면 회원 정보를 loginUser에 담아옵니다.
        M_D1P2_MemberDTO loginUser = memberService.login(memberDTO);
        
        if (loginUser != null) { // 로그인에 성공했다면 (정보가 있다면)
            
            // 4-1. 세션(Session) 처리: 브라우저가 꺼질 때까지 로그인 상태를 유지하도록 서버(세션)에 저장
            session.setAttribute("member", loginUser);
            
            // 4-2. 쿠키(Cookie) 처리: "아이디 저장" 기능을 위해 브라우저에 쿠키를 구워줌
            Cookie cookie = new Cookie("rememberId", memberDTO.getUsername()); // 쿠키 이름과 값 설정
            cookie.setPath("/"); // 우리 사이트 모든 곳에서 이 쿠키를 사용할 수 있게 설정
            
            if (rememberId != null) { // 사용자가 "아이디 저장" 체크박스를 체크했다면
                cookie.setMaxAge(60 * 60 * 24 * 7); // 7일(초단위) 동안 쿠키를 브라우저에 살려둡니다.
            } else { // 체크하지 않았다면
                cookie.setMaxAge(0); // 수명을 0으로 설정해서 기존 쿠키도 즉시 삭제해 버립니다.
            }
            response.addCookie(cookie); // 완성된 쿠키를 사용자 브라우저로 보냅니다.
            
            // 로그인 성공 후 책 목록 화면으로 이동합니다.
            return "redirect:/book/list";
            
        } else { // 로그인에 실패했다면 (정보가 없다면)
            // 다시 로그인 폼 화면으로 되돌려 보냅니다.
            return "redirect:/member/login";
        }
    }

    // ==========================================
    // 5. 로그아웃 처리
    // ==========================================
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        // 세션에 들어있던 정보(로그인 정보 등)를 모두 날려버립니다(초기화).
        session.invalidate(); 
        
        // 로그아웃 후 다시 책 목록 화면으로 이동합니다.
        return "redirect:/book/list";
    }
}

