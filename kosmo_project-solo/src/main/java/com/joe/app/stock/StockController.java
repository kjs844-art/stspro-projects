package com.joe.app.stock;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/*
 * ================================================================
 * [Phase 2] - 파일 (8)번 : StockController.java
 * ================================================================
 *
 * [왜 이 파일이 8번째로 만들어지나?]
 *
 * DTO(6) → Service(7) → Controller(8) 순서가 이유다.
 *
 * Controller는 Service를 사용(의존)한다.
 * 즉 StockController 안에서 StockService를 호출해야 한다.
 * Service가 없으면 Controller에서 호출할 것이 없다.
 * 그래서 항상 Service를 먼저 만들고 Controller를 나중에 만든다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Controller 어노테이션
 *    → HomeController와 동일한 원리
 *
 * ② 생성자 주입 (의존성 주입 - DI)
 *    → StockController는 StockService가 필요하다
 *    → Spring이 StockService 객체를 자동으로 만들어서 넣어준다
 *    → 이것을 "의존성 주입(Dependency Injection)"이라고 한다
 *    → 코드: private final StockService stockService;
 *             + 생성자(Constructor)
 *
 * ③ @GetMapping("/stock/list")
 *    → 브라우저에서 /stock/list 주소로 접속하면 이 메서드 실행
 *
 * ④ @RequestParam 으로 검색어 받기
 *    → 예: /stock/list?keyword=AAPL
 *    → keyword = "AAPL" 을 파라미터로 받아서 Service에 전달
 *    → required = false → 검색어 없이 접속해도 에러 안 남
 *
 * ⑤ Model에 데이터 담기
 *    → model.addAttribute("stock", dto);
 *    → JSP에서 ${stock.ticker}, ${stock.currentPrice} 로 출력
 *
 * ----------------------------------------------------------------
 * [데이터 흐름 전체 요약 - Phase 2 완성]
 *
 * 브라우저: /stock/list?keyword=AAPL
 *   ↓
 * StockController.list(keyword="AAPL", model)
 *   ↓
 * StockDTO dto = stockService.getStockData("AAPL")
 *   ↓
 * model.addAttribute("stock", dto)
 *   ↓
 * return "stock/list"
 *   ↓
 * /WEB-INF/views/stock/list.jsp 에 dto 데이터가 전달됨
 *   ↓
 * JSP에서 ${stock.companyName}, ${stock.currentPrice} 출력
 *
 * ----------------------------------------------------------------
 * [생성자 주입 vs @Autowired - 왜 생성자 주입을 쓰나?]
 *
 * 방법1 (옛날 방식): @Autowired private StockService stockService;
 * 방법2 (권장 방식): 생성자(Constructor) 주입
 *
 * 생성자 주입을 권장하는 이유:
 * - 테스트 코드 작성이 쉽다
 * - final로 선언할 수 있어서 실수로 변경되지 않는다
 * - Spring Boot 공식 문서도 생성자 주입 권장
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (9)번 stock/list.jsp
 *    이유: Controller가 return "stock/list" 를 반환하므로
 *    stock/list.jsp 파일이 반드시 있어야 한다.
 *
 * ================================================================
 */

@Controller

public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/stock/list")
    public String list(@RequestParam(required = false) String keyword, Model model) {
        StockDTO stock = stockService.getStockData(keyword);

        model.addAttribute("stock", stock);
        model.addAttribute("keyword", stock.getTicker());

        return "stock/list";
    }

}
