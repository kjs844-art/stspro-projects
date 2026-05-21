package com.joe.app.watchlist;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

/*
 * ================================================================
 * [Phase 4] - 파일 (17)번 : WatchlistService.java
 * ================================================================
 *
 * [왜 이 파일이 17번째로 만들어지나?]
 *
 * Phase 4 생성 순서:
 * DTO(14) → Mapper.java(15) → Mapper.xml(16) → Service(17) → Controller(18) → JSP(19,20)
 *
 * Service는 Mapper를 사용해서 DB 작업을 수행한다.
 * Mapper가 없으면 Service가 DB에 접근할 방법이 없다.
 * 그래서 Mapper 다음에 Service를 만든다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Service 어노테이션
 *
 * ② 생성자 주입으로 WatchlistMapper 받기
 *    → private final WatchlistMapper watchlistMapper;
 *    → Spring이 @Mapper 인터페이스의 구현체를 자동으로 주입해준다
 *
 * ③ public List<WatchlistDTO> getList() 메서드
 *    → watchlistMapper.findAll() 호출
 *    → DB에서 전체 목록 조회 후 반환
 *
 * ④ public void add(WatchlistDTO dto) 메서드
 *    → watchlistMapper.insert(dto) 호출
 *    → DB에 새 관심종목 추가
 *
 * ⑤ public void remove(Integer id) 메서드
 *    → watchlistMapper.delete(id) 호출
 *    → DB에서 해당 id의 관심종목 삭제
 *
 * ----------------------------------------------------------------
 * [Phase 2,3 Service vs Phase 4 Service 핵심 차이]
 *
 * Phase 2,3: RestTemplate으로 외부 API 호출 → DTO에 담기
 * Phase 4:   Mapper를 통해 DB(PostgreSQL) 조회/저장 → DTO에 담기
 *
 * 두 방식 모두 Service가 데이터를 가져오는 중간 계층 역할을 한다.
 * 출처(외부 API vs DB)만 다를 뿐 Controller-Service 관계는 동일!
 *
 * ----------------------------------------------------------------
 * [트랜잭션 개념 (나중에 배울 내용)]
 *
 * @Transactional 어노테이션:
 * → DB 작업 중 오류가 나면 자동으로 롤백(되돌리기)
 * → 지금 당장은 몰라도 되지만, 나중에 꼭 배워야 할 개념
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (18)번 WatchlistController.java
 *    이유: Service가 준비됐으니 CRUD URL 요청을 처리하는
 *    Controller를 만든다.
 *    Phase 4에서는 GET(조회/목록)과 POST(저장)를 모두 처리한다.
 *
 * ================================================================
 */

@Service

public class WatchlistService {

    private final WatchlistMapper watchlistMapper;

    public WatchlistService(WatchlistMapper watchlistMapper) {
        this.watchlistMapper = watchlistMapper;
    }

    public List<WatchlistDTO> getList() {
        try {
            return watchlistMapper.findAll();
        } catch (RuntimeException e) {
            return sampleList();
        }
    }

    public void add(WatchlistDTO dto) {
        if (dto == null || dto.getTicker() == null || dto.getTicker().isBlank()) {
            return;
        }

        dto.setTicker(dto.getTicker().trim().toUpperCase());

        if (dto.getMemo() != null) {
            dto.setMemo(dto.getMemo().trim());
        }

        watchlistMapper.insert(dto);
    }

    public void remove(Integer id) {
        if (id == null) {
            return;
        }

        watchlistMapper.delete(id);
    }

    private List<WatchlistDTO> sampleList() {
        List<WatchlistDTO> list = new ArrayList<>();

        WatchlistDTO first = new WatchlistDTO();
        first.setId(1);
        first.setTicker("PFE");
        first.setMemo("DB 테이블 생성 전 샘플: Pfizer");
        first.setRegDate("-");
        list.add(first);

        WatchlistDTO second = new WatchlistDTO();
        second.setId(2);
        second.setTicker("MRNA");
        second.setMemo("DB 테이블 생성 전 샘플: Moderna");
        second.setRegDate("-");
        list.add(second);

        return list;
    }

}
