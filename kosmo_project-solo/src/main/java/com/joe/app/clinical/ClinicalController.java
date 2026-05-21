package com.joe.app.clinical;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/*
 * ================================================================
 * [Phase 3] - 파일 (12)번 : ClinicalController.java
 * ================================================================
 *
 * [왜 이 파일이 12번째로 만들어지나?]
 *
 * ClinicalDTO(10) → ClinicalService(11) → ClinicalController(12)
 * 동일한 패턴 반복. 이제 이 순서가 자연스럽게 느껴져야 한다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Controller + 생성자 주입 (ClinicalService 주입)
 *
 * ② @GetMapping("/clinical/list")
 *    → /clinical/list 요청을 받는 메서드
 *
 * ③ @RequestParam 으로 검색어 받기
 *    → /clinical/list?keyword=lung+cancer
 *    → keyword = "lung cancer"
 *
 * ④ List<ClinicalDTO> 받아서 Model에 담기
 *    → List<ClinicalDTO> trials = clinicalService.searchTrials(keyword);
 *    → model.addAttribute("trials", trials);
 *    → return "clinical/list";
 *
 * ----------------------------------------------------------------
 * [Model에 List를 담을 때와 단일 객체를 담을 때 차이]
 *
 * 단일 객체 (Phase 2):
 *   model.addAttribute("stock", dto);
 *   → JSP: ${stock.companyName}
 *
 * 목록 (Phase 3):
 *   model.addAttribute("trials", list);
 *   → JSP: <c:forEach var="trial" items="${trials}">
 *             ${trial.briefTitle}
 *           </c:forEach>
 *
 * → forEach 태그로 목록을 순회하며 각 DTO 데이터를 출력!
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (13)번 clinical/list.jsp
 *    이유: return "clinical/list" 대응 JSP 파일 생성.
 *    List를 <c:forEach>로 출력하는 연습.
 *
 * ================================================================
 */

@Controller

public class ClinicalController {

    private final ClinicalService clinicalService;

    public ClinicalController(ClinicalService clinicalService) {
        this.clinicalService = clinicalService;
    }

    @GetMapping("/clinical/list")
    public String list(@RequestParam(required = false) String keyword, Model model) {
        List<ClinicalDTO> trials = clinicalService.searchTrials(keyword);

        model.addAttribute("trials", trials);
        model.addAttribute("keyword", keyword == null || keyword.isBlank() ? "cancer" : keyword.trim());

        return "clinical/list";
    }

}
