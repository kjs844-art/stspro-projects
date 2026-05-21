package com.joe.fin.member;

import java.util.Map;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
public class MemberApiController {
    private final MemberService memberService;

    public MemberApiController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody MemberRequest request, HttpSession session) {
        MemberDTO member = memberService.register(request.email(), request.displayName(), request.password());
        session.setAttribute("loginMember", member);
        return ResponseEntity.ok(Map.of("ok", true, "member", member));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberRequest request, HttpSession session) {
        return memberService.login(request.email(), request.password())
                .<ResponseEntity<?>>map(member -> {
                    session.setAttribute("loginMember", member);
                    return ResponseEntity.ok(Map.of("ok", true, "member", member));
                })
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("ok", false, "message", "이메일 또는 비밀번호를 확인하세요.")));
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(HttpSession session) {
        session.invalidate();
        return Map.of("ok", true);
    }

    @GetMapping("/session")
    public Map<String, Object> session(HttpSession session) {
        Object member = session.getAttribute("loginMember");
        return Map.of("loggedIn", member != null, "member", member == null ? "" : member);
    }

    @GetMapping
    public Map<String, Object> members() {
        return Map.of("members", memberService.findAll());
    }

    public record MemberRequest(String email, String displayName, String password) {
    }
}
