package com.joe.app.watchlist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/*
 * ================================================================
 * [Phase 4] - 파일 (18)번 : WatchlistController.java
 * ================================================================
 *
 * [왜 이 파일이 18번째로 만들어지나?]
 *
 * Service(17번)가 준비됐으니, 이제 URL 요청을 받아서
 * Service의 CRUD 메서드를 호출하는 Controller를 만든다.
 *
 * ----------------------------------------------------------------
 * [이 파일에서 Phase 2,3과 달라지는 핵심: POST 방식 등장!]
 *
 * Phase 2,3: GET 방식만 사용 (URL 주소창으로 접근)
 * Phase 4:   GET(목록 조회) + POST(저장/삭제) 모두 사용
 *
 * GET  = 브라우저 주소창에 URL 입력 → 데이터 조회
 * POST = HTML 폼의 <form method="post"> → 데이터 전송/저장
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Controller + 생성자 주입 (WatchlistService)
 *
 * ② @GetMapping("/watchlist/list")
 *    → 관심종목 목록 조회
 *    → watchlistService.getList() 호출
 *    → model.addAttribute("list", ...) 담아서
 *    → return "watchlist/list"
 *
 * ③ @GetMapping("/watchlist/add")
 *    → 관심종목 추가 화면 열기
 *    → return "watchlist/add"
 *
 * ④ @PostMapping("/watchlist/add")  ← 핵심! POST 방식
 *    → add.jsp 폼에서 전송된 데이터를 받음
 *    → WatchlistDTO dto 파라미터로 폼 데이터 자동 수신
 *    → watchlistService.add(dto) 호출해서 DB에 저장
 *    → return "redirect:/watchlist/list"  ← 저장 후 목록으로 이동
 *
 * ⑤ @PostMapping("/watchlist/delete")
 *    → 삭제 요청 처리
 *    → Integer id 파라미터로 삭제할 항목의 id 수신
 *    → watchlistService.remove(id) 호출
 *    → return "redirect:/watchlist/list"
 *
 * ----------------------------------------------------------------
 * [redirect: 이해]
 *
 * return "redirect:/watchlist/list";
 * → JSP 화면을 바로 보여주는 것이 아니라,
 *   /watchlist/list URL로 다시 요청을 보내라는 지시
 * → 왜? POST 후 새로고침을 하면 데이터가 중복 저장될 수 있음!
 * → POST 처리 후 반드시 redirect: 를 사용하는 것이 원칙 (PRG 패턴)
 *
 * ----------------------------------------------------------------
 * [@ModelAttribute vs @RequestParam]
 *
 * @RequestParam String ticker  : 파라미터 하나씩 받기
 * WatchlistDTO dto             : 폼의 여러 파라미터를 DTO에 자동으로 묶어서 받기
 *                                (폼 필드명 = DTO 필드명 일치 필요)
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (19)번 watchlist/list.jsp
 *    이유: return "watchlist/list" 대응 JSP 필요.
 *    DB에서 가져온 목록을 <c:forEach>로 출력.
 *    삭제 버튼도 추가.
 *
 * ================================================================
 */

@Controller

public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @GetMapping("/watchlist/list")
    public String list(Model model) {
        model.addAttribute("list", watchlistService.getList());
        return "watchlist/list";
    }

    @GetMapping("/watchlist/add")
    public String addForm() {
        return "watchlist/add";
    }

    @PostMapping("/watchlist/add")
    public String add(WatchlistDTO dto, Model model) {
        try {
            watchlistService.add(dto);
            return "redirect:/watchlist/list";
        } catch (RuntimeException e) {
            model.addAttribute("error", "DB 테이블이 아직 없거나 연결이 불안정합니다. watchlist 테이블 생성 후 다시 시도하세요.");
            return "watchlist/add";
        }
    }

    @PostMapping("/watchlist/delete")
    public String delete(@RequestParam Integer id) {
        try {
            watchlistService.remove(id);
        } catch (RuntimeException e) {
            // DB 테이블이 아직 없을 때도 목록 화면은 계속 볼 수 있게 한다.
        }

        return "redirect:/watchlist/list";
    }

}
