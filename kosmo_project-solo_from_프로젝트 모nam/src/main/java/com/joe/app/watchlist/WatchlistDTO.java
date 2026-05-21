package com.joe.app.watchlist;

/*
 * ================================================================
 * [Phase 4] - 파일 (14)번 : WatchlistDTO.java
 * ================================================================
 *
 * [왜 이 파일이 14번째로 만들어지나?]
 *
 * Phase 4는 DB(데이터베이스) 연동이다.
 * DB에는 실제 테이블이 있고, 그 테이블의 컬럼들이 있다.
 * DTO의 필드는 DB 테이블 컬럼과 1:1 대응되어야 한다.
 *
 * 즉, DB 테이블을 먼저 설계하고,
 * 그 테이블 구조를 그대로 DTO 클래스로 표현하는 것이다.
 *
 * ----------------------------------------------------------------
 * [DB 테이블 설계 (PostgreSQL)]
 *
 * CREATE TABLE watchlist (
 *     id          SERIAL PRIMARY KEY,
 *     ticker      VARCHAR(20) NOT NULL,
 *     memo        VARCHAR(200),
 *     reg_date    TIMESTAMP DEFAULT NOW()
 * );
 *
 * → 이 테이블 컬럼들이 바로 DTO의 필드가 된다
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Data (Lombok)
 *
 * ② private Integer id;
 *    → DB의 id 컬럼 (자동 증가 번호, PK)
 *
 * ③ private String ticker;
 *    → 관심 주식 코드 (예: "AAPL", "005930")
 *
 * ④ private String memo;
 *    → 사용자가 작성한 메모 (예: "FDA 승인 기대")
 *
 * ⑤ private String regDate;
 *    → 등록일시 (DB에서 자동 생성)
 *
 * ----------------------------------------------------------------
 * [Phase 2,3 DTO vs Phase 4 DTO 차이]
 *
 * | 구분           | Phase 2,3 DTO         | Phase 4 DTO              |
 * |----------------|-----------------------|--------------------------|
 * | 데이터 출처    | 외부 API 응답         | DB 테이블 컬럼           |
 * | id 필드        | 없음                  | 있음 (PK)                |
 * | DB 저장 여부   | 저장 안 함            | DB에 저장/조회           |
 * | Mapper 연결    | 없음                  | Mapper XML과 연결됨      |
 *
 * ----------------------------------------------------------------
 * [application.properties 설정 복습]
 *
 * mybatis.configuration.map-underscore-to-camel-case=true
 * → DB 컬럼명 reg_date  →  Java 필드명 regDate  로 자동 변환
 * → 이 설정이 있어서 reg_date 컬럼이 자동으로 regDate 필드에 매핑됨
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (15)번 WatchlistMapper.java
 *    이유: DB에서 데이터를 꺼내거나 넣는 SQL 메서드를 선언하는
 *    인터페이스(Mapper)를 만들어야 한다.
 *    DTO 구조가 확정되어야 Mapper 메서드의 반환 타입을 정할 수 있다.
 *
 * ================================================================
 */

// TODO: @Data 어노테이션

public class WatchlistDTO {

    // TODO: private Integer id;
    // TODO: private String ticker;
    // TODO: private String memo;
    // TODO: private String regDate;

}
