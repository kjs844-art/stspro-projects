package com.joe.app.stock;

import java.io.IOException;
import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import yahoofinance.Stock;
import yahoofinance.YahooFinance;

/*
 * ================================================================
 * [Phase 2] - 파일 (7)번 : StockService.java
 * ================================================================
 *
 * [왜 이 파일이 7번째로 만들어지나?]
 *
 * Controller는 "요청을 받아서 결과를 JSP로 보내는" 역할만 한다.
 * 실제 API 호출 같은 복잡한 작업은 Service에서 한다.
 *
 * 역할 분리 원칙 (MVC에서 중요!):
 * - Controller: 요청/응답 담당 (교통경찰)
 * - Service: 비즈니스 로직 담당 (실무 담당자)
 * - 이 둘이 섞이면 코드가 지저분해지고 나중에 수정이 어려워진다
 *
 * DTO(6번)가 있어야 Service에서 dto.setXxx() 로 데이터를 넣을 수 있다.
 * 그래서 DTO 다음에 Service가 만들어진다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Service 어노테이션
 *    → Spring에게 "이 클래스는 비즈니스 로직 담당 Service야" 라고 알려준다
 *    → Spring이 자동으로 이 객체를 관리(주입)해준다
 *
 * ② RestTemplate (HTTP 요청 도구)
 *    → 자바에서 외부 URL로 HTTP 요청을 보내고 응답을 받는 도구
 *    → 마치 브라우저처럼 URL을 호출하고 결과를 받아오는 것
 *    → 예: restTemplate.getForObject(url, String.class)
 *
 * ③ AlphaVantage API 호출 URL 예시:
 *    https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_KEY
 *    → 이 URL을 호출하면 JSON 형식의 주식 데이터가 온다
 *    → 받은 JSON을 파싱해서 StockDTO에 담는다
 *
 * ④ public StockDTO getStockData(String ticker) 메서드
 *    → ticker = 주식 코드 (예: "AAPL")
 *    → API 호출 → JSON 파싱 → DTO에 담아서 반환
 *
 * ----------------------------------------------------------------
 * [외부 API 호출 흐름]
 *
 * StockController가 service.getStockData("AAPL") 호출
 *   ↓
 * RestTemplate으로 AlphaVantage API URL 호출
 *   ↓
 * API 서버가 JSON 데이터를 보내줌
 *   ↓
 * JSON 파싱 (주가, 등락률 등 추출)
 *   ↓
 * StockDTO에 데이터 넣기 (dto.setCurrentPrice(...))
 *   ↓
 * return dto; → Controller에 DTO 전달
 *
 * ----------------------------------------------------------------
 * [application.properties에 API 키 설정 방법]
 *
 * application.properties에:
 *   app.alphavantage.api.key=YOUR_API_KEY
 * 라고 적고
 *
 * Service에서:
 *   @Value("${app.alphavantage.api.key}")
 *   private String apiKey;
 * 로 가져온다.
 * → API 키를 코드에 직접 쓰지 않는 것이 보안상 올바른 방법
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (8)번 StockController.java
 *    이유: Service(일꾼)가 준비됐으니, 이제 URL 요청을 받아서
 *    Service를 호출하고 결과를 JSP로 보내는 Controller를 만든다.
 *
 * ================================================================
 */

@Service

public class StockService {

    public StockDTO getStockData(String ticker) {
        String normalizedTicker = normalizeTicker(ticker);

        StockDTO dto = new StockDTO();
        dto.setTicker(normalizedTicker);
        dto.setIndustry("Bio / Pharma watch target");

        try {
            Stock stock = YahooFinance.get(normalizedTicker);

            if (stock == null) {
                dto.setCompanyName("검색 결과 없음");
                dto.setMessage("주식 코드를 다시 확인해 주세요. 예: AAPL, PFE, MRNA");
                return dto;
            }

            dto.setCompanyName(valueOrDefault(stock.getName(), normalizedTicker));

            if (stock.getQuote() != null) {
                dto.setCurrentPrice(stock.getQuote().getPrice());
                dto.setChangePercent(stock.getQuote().getChangeInPercent());
            }

            dto.setMessage("Yahoo Finance API에서 데이터를 받아왔습니다.");
            return dto;
        } catch (IOException | RuntimeException e) {
            return fallbackStock(normalizedTicker, "외부 API 연결이 불안정해서 학습용 샘플 데이터를 표시합니다.");
        }
    }

    private String normalizeTicker(String ticker) {
        if (ticker == null || ticker.isBlank()) {
            return "AAPL";
        }

        return ticker.trim().toUpperCase();
    }

    private String valueOrDefault(String value, String defaultValue) {
        if (value == null || value.isBlank()) {
            return defaultValue;
        }

        return value;
    }

    private StockDTO fallbackStock(String ticker, String message) {
        StockDTO dto = new StockDTO();
        dto.setTicker(ticker);
        dto.setCompanyName(sampleCompanyName(ticker));
        dto.setCurrentPrice(new BigDecimal("0.00"));
        dto.setChangePercent(new BigDecimal("0.00"));
        dto.setIndustry("Bio / Pharma watch target");
        dto.setMessage(message);
        return dto;
    }

    private String sampleCompanyName(String ticker) {
        return switch (ticker) {
            case "PFE" -> "Pfizer Inc.";
            case "MRNA" -> "Moderna Inc.";
            case "JNJ" -> "Johnson & Johnson";
            case "LLY" -> "Eli Lilly and Company";
            case "AAPL" -> "Apple Inc.";
            default -> ticker;
        };
    }

}
