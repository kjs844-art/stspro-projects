package com.joe.app.member;

/*
 * ================================================================
 * [Phase 5] - 파일 (21)번 : MemberDTO.java
 * ================================================================
 *
 * [왜 이 파일이 21번째로 만들어지나?]
 *
 * Phase 5는 회원 기능 (로그인, 회원가입, 마이페이지)이다.
 * Phase 4와 완전히 같은 순서: DTO → Mapper.java → Mapper.xml → Service → Controller → JSP
 * 이 패턴이 이제 세 번째 반복이다. 자연스럽게 외워져야 한다.
 *
 * ----------------------------------------------------------------
 * [DB 테이블 설계]
 *
 * CREATE TABLE member (
 *     id        SERIAL PRIMARY KEY,
 *     user_id   VARCHAR(50) UNIQUE NOT NULL,
 *     password  VARCHAR(200) NOT NULL,      ← 암호화된 비밀번호 저장
 *     nickname  VARCHAR(50),
 *     reg_date  TIMESTAMP DEFAULT NOW()
 * );
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Data (Lombok)
 *
 * ② private Integer id;
 *    → 회원 고유번호 (자동 증가)
 *
 * ③ private String userId;
 *    → 로그인 아이디 (예: "joe123")
 *    → DB 컬럼명 user_id → camelCase userId로 자동 변환됨
 *
 * ④ private String password;
 *    → 비밀번호 (평문 저장 금지! BCrypt 암호화 후 저장)
 *
 * ⑤ private String nickname;
 *    → 닉네임 (예: "조제이")
 *
 * ⑥ private String regDate;
 *    → 가입일시
 *
 * ----------------------------------------------------------------
 * [비밀번호 보안: 절대 평문 저장 금지!]
 *
 * 잘못된 방법: password = "1234" (그대로 DB에 저장)
 * 올바른 방법: password = BCrypt.encode("1234") → "$2a$10$..." (암호화)
 *
 * BCrypt: Spring Security에 내장된 단방향 암호화 알고리즘
 * → 같은 비밀번호도 매번 다른 암호화 값 생성
 * → 복호화(원래값 복원)가 불가능 → 해킹당해도 비밀번호 모름
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (22)번 MemberMapper.java
 *    이유: 회원 DB 작업(로그인 조회, 회원가입 INSERT)을 위한
 *    Mapper 인터페이스가 필요하다.
 *
 * ================================================================
 */

// TODO: @Data 어노테이션

public class MemberDTO {

    // TODO: private Integer id;
    // TODO: private String userId;     ← DB 컬럼 user_id와 camelCase 자동 변환
    // TODO: private String password;
    // TODO: private String nickname;
    // TODO: private String regDate;

}
