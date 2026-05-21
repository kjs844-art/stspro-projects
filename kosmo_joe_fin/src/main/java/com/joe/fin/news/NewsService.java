package com.joe.fin.news;

import java.util.List;

import org.springframework.stereotype.Service;

@Service

public class NewsService {
	public List<NewsDTO> findBySymbol(String symbol) {
		String cleanSymbol = symbol == null ? "MARKET" : symbol.toUpperCase();
		return List.of(
			create(cleanSymbol, cleanSymbol + " 실적과 AI 수요 점검", "KOSMO FIN Demo",
				"매출 성장, 마진, 데이터센터 수요를 함께 확인해야 합니다."),
			create(cleanSymbol, cleanSymbol + " 주가 변동성 체크", "KOSMO FIN Demo",
				"단기 가격보다 금리, 환율, 섹터 수급을 같이 보는 연습이 필요합니다."),
			create(cleanSymbol, cleanSymbol + " 투자 전 리스크 메모", "KOSMO FIN Demo",
				"이 뉴스 카드는 학습용 샘플이며 실제 투자 판단에는 추가 검증이 필요합니다."),
			create(cleanSymbol, cleanSymbol + " 섹터 비교 리포트", "KOSMO FIN Premium Demo",
				"동종 업계와 매출 성장률, 밸류에이션, AI 투자 모멘텀을 비교합니다."),
			create(cleanSymbol, cleanSymbol + " 장기 체크포인트", "KOSMO FIN Premium Demo",
				"프리미엄 화면에서는 실적 발표, 금리, 환율, 경쟁사 뉴스를 함께 묶어 봅니다.")
		);
	}

	private NewsDTO create(String symbol, String title, String source, String summary) {
		NewsDTO dto = new NewsDTO();
		dto.setSymbol(symbol);
		dto.setTitle(title);
		dto.setSource(source);
		dto.setSummary(summary);
		dto.setUrl("#");
		return dto;
	}

}
