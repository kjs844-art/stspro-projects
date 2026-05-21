package com.joe.app.member;

/*
 * ================================================================
 * [Phase 5] - 파일 (24)번 : MemberService.java
 * ================================================================
 *
 * [왜 이 파일이 24번째로 만들어지나?]
 *
 * MemberMapper(22,23번)가 준비됐으니 그 Mapper를 사용해서
 * 로그인 검증과 회원가입 처리를 담당하는 Service를 만든다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Service 어노테이션
 *
 * ② BCryptPasswordEncoder 주입
 *    → Spring Security의 비밀번호 암호화 도구
 *    → 회원가입 시 평문 비밀번호를 암호화해서 DB에 저장
 *    → 로그인 시 입력값과 DB 암호화값을 안전하게 비교
 *
 * ③ public boolean login(String userId, String rawPassword) 메서드
 *    → 로그인 검증 로직
 *    → 1단계: memberMapper.findByUserId(userId) → MemberDTO 조회
 *    → 2단계: dto가 null이면 → 없는 아이디 → false 반환
 *    → 3단계: encoder.matches(rawPassword, dto.getPassword())
 *             → 입력 비밀번호 vs DB 암호화 비밀번호 비교
 *    → 4단계: 일치하면 true, 불일치하면 false 반환
 *
 * ④ public void join(MemberDTO dto) 메서드
 *    → 회원가입 처리
 *    → dto.setPassword(encoder.encode(dto.getPassword()))
 *       → 비밀번호를 암호화해서 DTO에 다시 저장
 *    → memberMapper.insert(dto)
 *       → 암호화된 비밀번호가 담긴 DTO를 DB에 저장
 *
 * ----------------------------------------------------------------
 * [세션(Session) 개념 - Controller에서 처리]
 *
 * 로그인 성공 후 "이 사람이 로그인됐다"는 정보를 어딘가에 저장해야 한다.
 * 이것을 "세션(Session)"이라고 한다.
 *
 * MemberController에서:
 *   HttpSession session = request.getSession();
 *   session.setAttribute("loginUser", userId);
 *   → 로그인 성공 시 세션에 userId 저장
 *
 * JSP에서:
 *   ${sessionScope.loginUser}
 *   → 세션에 저장된 userId를 화면에 출력
 *
 * 로그아웃:
 *   session.invalidate();
 *   → 세션 삭제 = 로그아웃 처리
 *
 * ----------------------------------------------------------------
 * [Phase 5에서 처음 등장하는 개념들]
 *
 * ① BCryptPasswordEncoder → 비밀번호 보안
 * ② HttpSession           → 로그인 상태 유지
 * ③ POST 폼 → DB INSERT   → 회원가입
 * ④ POST 폼 → DB SELECT   → 로그인 검증
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (25)번 MemberController.java
 *    이유: Service가 준비됐으니 로그인/가입/마이페이지
 *    URL 요청을 처리하는 Controller를 만든다.
 *    세션 처리도 이 Controller에서 한다.
 *
 * ================================================================
 */

// TODO: import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// TODO: import org.springframework.stereotype.Service;

// TODO: @Service 어노테이션 붙이기

public class MemberService {

    // TODO: private final MemberMapper memberMapper; 선언
    // TODO: private final BCryptPasswordEncoder encoder; 선언 (Spring Security 필요)
    // TODO: 생성자에서 둘 다 주입받기

    // TODO: public boolean login(String userId, String rawPassword)
    //   → findByUserId → null 체크 → encoder.matches → true/false 반환

    // TODO: public void join(MemberDTO dto)
    //   → dto.setPassword(encoder.encode(dto.getPassword())) → insert

}
