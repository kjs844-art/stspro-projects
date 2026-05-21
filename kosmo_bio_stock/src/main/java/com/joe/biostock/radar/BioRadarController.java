package com.joe.biostock.radar;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class BioRadarController {

	private final BioRadarService bioRadarService; // 흐름 1: Controller가 Service에게 데이터 준비를 부탁하기 위해 들고 있는 변수입니다.

	public BioRadarController(BioRadarService bioRadarService) {
		this.bioRadarService = bioRadarService; // 흐름 2: Spring이 만든 BioRadarService 객체를 이 Controller 안에 넣어줍니다.
	}

	@GetMapping("/radar/list")
	public String list(@RequestParam(required = false) String keyword, Model model) {
		String searchKeyword = keyword == null ? "" : keyword.trim(); // 흐름 3: 브라우저 검색창에서 넘어온 keyword 값을 앞뒤 공백 없이 정리합니다.

		List<BioSignalDTO> signals = bioRadarService.findSignals(searchKeyword); // 흐름 4: Service의 findSignals() 메서드에 검색어를 보내고 결과 목록을 받습니다.

		model.addAttribute("signals", signals); // 흐름 5: JSP에서 ${signals}로 꺼낼 수 있게 검색 결과 목록을 Model에 담습니다.
		model.addAttribute("keyword", searchKeyword); // 흐름 6: JSP 검색창에 사용자가 입력한 검색어를 다시 보여주기 위해 담습니다.
		model.addAttribute("resultCount", signals.size()); // 흐름 7: JSP에서 검색 결과 개수를 출력할 수 있게 목록 크기를 담습니다.

		return "radar/list"; // 흐름 8: /WEB-INF/views/radar/list.jsp 화면으로 이동합니다.
	}
}
