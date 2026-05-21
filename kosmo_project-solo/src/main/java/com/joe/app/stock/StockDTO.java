package com.joe.app.stock;

import java.math.BigDecimal;

import lombok.Data;

/*
 * ================================================================
 * [Phase 2] - 파일 (6)번 : StockDTO.java
 * ================================================================
 *
 * [왜 이 파일이 6번째로 만들어지나?]
 *
 * DTO = Data Transfer Object = 데이터를 담아 나르는 택배 상자
 *
 * Service에서 외부 API를 호출하면 주식 데이터가 온다.
 * 그 데이터를 담아서 Controller로 전달하고,
 * Controller에서 Model에 담아서 JSP로 전달해야 한다.
 *
 * "상자(DTO)"를 먼저 만들어야 그 상자에 물건을 넣는
 * "포장 직원(Service)"을 만들 수 있다.
 * 그래서 Service보다 DTO가 먼저 만들어진다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Data 어노테이션 (Lombok)
 *    → getter, setter, toString을 자동으로 만들어준다
 *    → 없으면 직접 getXxx(), setXxx() 메서드를 수십 줄 작성해야 함
 *
 * ② private String ticker;
 *    → 주식 코드 (예: "AAPL", "TSLA", "005930")
 *
 * ③ private String companyName;
 *    → 회사명 (예: "Apple Inc.", "삼성전자")
 *
 * ④ private BigDecimal currentPrice;
 *    → 현재 주가 (소수점이 있어서 BigDecimal 사용, Double도 가능)
 *
 * ⑤ private BigDecimal changePercent;
 *    → 등락률 (예: +2.5%, -1.3%)
 *
 * ⑥ private String industry;
 *    → 업종 (예: "Biotechnology", "Pharmaceuticals")
 *
 * ----------------------------------------------------------------
 * [DTO 이름 규칙]
 *
 * 파일명: 기능명 + DTO.java
 * 예: StockDTO, MemberDTO, WatchlistDTO, ClinicalDTO
 * → DTO라는 접미사를 붙여서 "이건 데이터 상자야"라고 명시
 *
 * ----------------------------------------------------------------
 * [데이터 흐름에서 DTO의 위치]
 *
 * StockService에서 API 호출
 *   ↓
 * StockDTO dto = new StockDTO();    ← 상자 생성
 * dto.setTicker("AAPL");            ← 상자에 데이터 넣기
 * dto.setCurrentPrice(new BigDecimal("150.00")); ← 가격 넣기
 * return dto;                       ← 상자를 Controller에 전달
 *   ↓
 * StockController에서 model.addAttribute("stock", dto) ← JSP에 전달
 *   ↓
 * stock/list.jsp에서 ${stock.ticker} 으로 출력         ← 화면 표시
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (7)번 StockService.java
 *    이유: DTO(상자)가 준비됐으니, 이제 그 상자에
 *    실제 API 데이터를 담는 로직(Service)을 짤 수 있다.
 *
 * ================================================================
 */

@Data

public class StockDTO {

    private String ticker;
    private String companyName;
    private BigDecimal currentPrice;
    private BigDecimal changePercent;
    private String industry;
    private String message;

}
