package com.joe.app.member;

/*
 * ================================================================
 * [Phase 5] - 파일 (22)번 : MemberMapper.java
 * ================================================================
 *
 * [왜 이 파일이 22번째로 만들어지나?]
 *
 * Phase 4의 WatchlistMapper와 완전히 동일한 역할.
 * 회원 DB 작업을 위한 SQL 메서드를 선언하는 인터페이스.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Mapper 어노테이션
 *
 * ② MemberDTO findByUserId(String userId);
 *    → 로그인 검증에 사용
 *    → userId로 회원 1명 조회
 *    → SQL: SELECT * FROM member WHERE user_id = #{userId}
 *    → 없으면 null 반환
 *
 * ③ void insert(MemberDTO dto);
 *    → 회원가입 시 사용
 *    → SQL: INSERT INTO member (user_id, password, nickname) VALUES (...)
 *
 * ④ boolean existsByUserId(String userId);  (선택 사항)
 *    → 아이디 중복 확인
 *    → SQL: SELECT COUNT(*) FROM member WHERE user_id = #{userId}
 *    → 1이면 true (이미 존재), 0이면 false
 *
 * ----------------------------------------------------------------
 * [findByUserId 반환 타입이 MemberDTO인 이유]
 *
 * 로그인 과정:
 * 1. 사용자가 아이디/비밀번호 입력
 * 2. DB에서 아이디로 회원 조회 → MemberDTO 반환
 * 3. MemberDTO가 null이면 → 없는 아이디
 * 4. BCrypt.matches(입력비밀번호, dto.getPassword()) → 비밀번호 검증
 * 5. 일치하면 로그인 성공 → 세션에 userId 저장
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (23)번 MemberMapper.xml
 *    이유: 인터페이스에 선언된 메서드들의 실제 SQL 작성.
 *
 * ================================================================
 */

// TODO: import org.apache.ibatis.annotations.Mapper;

// TODO: @Mapper 어노테이션 붙이기
// TODO: class가 아닌 interface로 선언!

public interface MemberMapper {

    // TODO: MemberDTO findByUserId(String userId);  → 로그인 검증용 조회
    // TODO: void insert(MemberDTO dto);              → 회원가입용 저장
    // TODO: boolean existsByUserId(String userId);  → 아이디 중복 확인 (선택)

}
