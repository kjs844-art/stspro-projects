package com.joe.app.watchlist;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

/*
 * ================================================================
 * [Phase 4] - 파일 (15)번 : WatchlistMapper.java
 * ================================================================
 *
 * [왜 이 파일이 15번째로 만들어지나?]
 *
 * DB에 SQL 쿼리를 실행하려면 그 SQL을 호출하는 "창구"가 필요하다.
 * MyBatis에서 이 창구 역할을 하는 것이 Mapper 인터페이스다.
 *
 * WatchlistDTO(14번)가 있어야
 * Mapper 메서드의 반환 타입 (List<WatchlistDTO>, WatchlistDTO 등)을
 * 정의할 수 있다.
 * 그래서 DTO 다음에 Mapper를 만든다.
 *
 * ----------------------------------------------------------------
 * [Mapper 인터페이스란?]
 *
 * - interface(인터페이스)로 선언한다 (class가 아님!)
 * - 메서드 선언만 있고, 실제 SQL은 없다
 * - 실제 SQL은 (16)번 WatchlistMapper.xml에 작성한다
 * - @Mapper 어노테이션을 붙이면 MyBatis가 자동으로 구현체를 만들어준다
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Mapper 어노테이션
 *    → MyBatis에게 "이 인터페이스는 SQL Mapper야" 라고 알려줌
 *    → Spring이 자동으로 이 인터페이스의 구현체(객체)를 만들어준다
 *
 * ② List<WatchlistDTO> findAll();
 *    → 관심종목 전체 목록 조회
 *    → SQL: SELECT * FROM watchlist ORDER BY id DESC
 *
 * ③ void insert(WatchlistDTO dto);
 *    → 새 관심종목 추가
 *    → SQL: INSERT INTO watchlist (ticker, memo) VALUES (?, ?)
 *
 * ④ void delete(Integer id);
 *    → 관심종목 삭제
 *    → SQL: DELETE FROM watchlist WHERE id = ?
 *
 * ----------------------------------------------------------------
 * [인터페이스(interface) vs 클래스(class) 차이]
 *
 * class: 메서드 선언 + 구현(body {}) 모두 있음
 * interface: 메서드 선언만 있음, 구현은 없음
 *
 * Mapper는 interface로 선언하는 이유:
 * → MyBatis가 XML의 SQL을 보고 자동으로 구현체를 만들어줌
 * → 개발자는 "어떤 SQL이 필요한지"만 선언하면 됨
 *
 * ----------------------------------------------------------------
 * [Mapper 인터페이스와 XML의 연결 규칙]
 *
 * WatchlistMapper.java (인터페이스)
 *   → 메서드명: findAll()
 *   WatchlistMapper.xml (SQL)
 *   → id="findAll" 인 SQL 태그와 1:1 대응
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (16)번 WatchlistMapper.xml
 *    이유: Mapper 인터페이스에 선언된 메서드들의
 *    실제 SQL 쿼리를 XML 파일에 작성해야 한다.
 *    인터페이스가 먼저 있어야 XML에서 참조할 수 있다.
 *
 * ================================================================
 */

@Mapper

public interface WatchlistMapper {

    List<WatchlistDTO> findAll();

    void insert(WatchlistDTO dto);

    void delete(Integer id);

}
