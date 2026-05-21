package com.joe.biostock.radar;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;

@Service
public class BioRadarService {

	private final RestTemplate restTemplate = createRestTemplate(); // 흐름 9: Java에서 외부 API 주소로 HTTP 요청을 보내기 위한 Spring 도구입니다.

	public List<BioSignalDTO> findSignals(String keyword) {
		List<BioSignalDTO> signals = createSampleSignals(); // 흐름 10: 기본 샘플 데이터를 먼저 만들어 둡니다.

		if (keyword == null || keyword.isBlank()) {
			return signals; // 흐름 11: 검색어가 비어 있으면 전체 샘플 목록을 Controller로 돌려줍니다.
		}

		List<BioSignalDTO> results = new ArrayList<>(); // 흐름 12: 샘플 검색 결과와 OpenAlex API 결과를 함께 담을 목록입니다.
		results.addAll(searchSampleSignals(signals, keyword)); // 흐름 13: 먼저 샘플 데이터에서 검색어와 맞는 결과를 찾아 담습니다.
		results.addAll(searchOpenAlexWorks(keyword)); // 흐름 14: OpenAlex 논문 API에서 검색어 관련 논문 데이터를 받아 담습니다.

		return results; // 흐름 15: 합쳐진 결과 목록을 Controller로 돌려줍니다.
	}

	private List<BioSignalDTO> searchSampleSignals(List<BioSignalDTO> signals, String keyword) {
		String lowerKeyword = keyword.toLowerCase(); // 흐름 16: 대소문자 차이 없이 찾기 위해 검색어를 소문자로 바꿉니다.
		List<BioSignalDTO> filteredSignals = new ArrayList<>(); // 흐름 17: 검색어와 맞는 샘플 결과만 따로 담을 새 목록입니다.

		for (BioSignalDTO signal : signals) {
			String text = signal.getSearchText(); // 흐름 18: DTO 안의 분야, 키워드, 제목, 이유를 검색용 한 문장으로 합쳐 가져옵니다.

			if (text.toLowerCase().contains(lowerKeyword)) {
				filteredSignals.add(signal); // 흐름 19: 검색어가 포함된 DTO만 filteredSignals 목록에 추가합니다.
			}
		}

		return filteredSignals; // 흐름 20: 필터링된 샘플 결과 목록을 findSignals()로 돌려줍니다.
	}

	private List<BioSignalDTO> searchOpenAlexWorks(String keyword) {
		List<BioSignalDTO> apiSignals = new ArrayList<>(); // 흐름 21: OpenAlex API 결과를 BioSignalDTO로 바꿔 담을 목록입니다.

		URI uri = UriComponentsBuilder.fromUriString("https://api.openalex.org/works")
			.queryParam("search", keyword)
			.queryParam("per-page", 3)
			.build()
			.toUri(); // 흐름 22: 검색어를 넣어 OpenAlex 논문 검색 API 주소를 만듭니다.

		try {
			JsonNode response = restTemplate.getForObject(uri, JsonNode.class); // 흐름 23: OpenAlex API를 호출하고 JSON 응답을 JsonNode 타입으로 받습니다.

			if (response == null || response.get("results") == null) {
				return apiSignals; // 흐름 24: API 응답이 비어 있으면 빈 목록을 돌려줍니다.
			}

			for (JsonNode work : response.get("results")) {
				String title = textOrDefault(work, "title", "제목 없음"); // 흐름 25: JSON에서 논문 제목을 꺼냅니다.
				int year = intOrDefault(work, "publication_year", 0); // 흐름 26: JSON에서 출판 연도를 꺼냅니다.
				int citedByCount = intOrDefault(work, "cited_by_count", 0); // 흐름 27: JSON에서 인용 수를 꺼냅니다.
				int score = Math.min(95, 60 + citedByCount / 10); // 흐름 28: 인용 수를 단순 점수로 바꿔 JSP에 보여줍니다.

				apiSignals.add(new BioSignalDTO("논문", keyword, title, "OpenAlex API / " + year, "근거", "검색어와 관련된 공개 논문 메타데이터입니다. 인용 수: " + citedByCount, score)); // 흐름 29: API JSON 데이터를 JSP가 출력할 수 있는 DTO로 변환합니다.
			}
		} catch (RestClientException ex) {
			apiSignals.add(new BioSignalDTO("API", keyword, "OpenAlex API 연결 실패", "OpenAlex API", "주의", "인터넷 연결 또는 API 응답 문제로 외부 데이터를 가져오지 못했습니다. 기존 샘플 데이터로 흐름을 계속 볼 수 있습니다.", 0)); // 흐름 30: API 실패도 화면에서 원인을 볼 수 있게 DTO로 담습니다.
		}

		return apiSignals; // 흐름 31: OpenAlex API 결과 목록을 findSignals()로 돌려줍니다.
	}

	private List<BioSignalDTO> createSampleSignals() {
		List<BioSignalDTO> signals = new ArrayList<>(); // 흐름 32: BioSignalDTO 여러 개를 담을 ArrayList 목록을 만듭니다.

		signals.add(new BioSignalDTO("바이오", "비만치료제", "GLP-1 관련 임상/시장 관심 증가", "샘플 데이터", "기회", "신약, 임상, 매출 성장 키워드가 같이 묶이면 관심 종목 후보가 됩니다.", 92)); // 흐름 33: 비만치료제 신호 DTO를 만들어 목록에 넣습니다.
		signals.add(new BioSignalDTO("바이오", "치매치료제", "알츠하이머 치료제 승인/부작용 이슈 체크", "샘플 데이터", "주의", "FDA 승인 뉴스와 안전성 이슈가 동시에 나오면 변동성이 커질 수 있습니다.", 81)); // 흐름 34: 치매치료제 신호 DTO를 만들어 목록에 넣습니다.
		signals.add(new BioSignalDTO("주식", "반도체", "AI 서버 수요와 HBM 공급 관련 뉴스 추적", "샘플 데이터", "기회", "AI 인프라 투자가 커질수록 반도체 공급망 키워드가 중요해집니다.", 88)); // 흐름 35: 반도체 신호 DTO를 만들어 목록에 넣습니다.
		signals.add(new BioSignalDTO("정책", "FDA", "허가/리콜/임상중단 공지 확인 필요", "샘플 데이터", "리스크", "바이오 주식은 규제 뉴스 하나로 가격이 크게 움직일 수 있습니다.", 76)); // 흐름 36: FDA 정책 신호 DTO를 만들어 목록에 넣습니다.

		return signals; // 흐름 37: 완성된 샘플 목록을 findSignals() 메서드로 돌려줍니다.
	}

	private RestTemplate createRestTemplate() {
		SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory(); // 흐름 38: 외부 API 연결 시간을 정하기 위한 HTTP 요청 설정 객체입니다.
		factory.setConnectTimeout(3000); // 흐름 39: API 서버 연결이 3초 넘게 안 되면 실패로 처리합니다.
		factory.setReadTimeout(5000); // 흐름 40: API 응답 읽기가 5초 넘게 걸리면 실패로 처리합니다.
		return new RestTemplate(factory); // 흐름 41: 위 시간 제한 설정을 적용한 RestTemplate을 만들어 돌려줍니다.
	}

	private String textOrDefault(JsonNode node, String fieldName, String defaultValue) {
		JsonNode value = node.get(fieldName); // 흐름 42: JSON 객체에서 fieldName에 해당하는 값을 꺼냅니다.
		return value == null || value.isNull() ? defaultValue : value.asText(); // 흐름 43: 값이 없으면 기본값을 쓰고, 있으면 문자열로 바꿉니다.
	}

	private int intOrDefault(JsonNode node, String fieldName, int defaultValue) {
		JsonNode value = node.get(fieldName); // 흐름 44: JSON 객체에서 숫자 필드를 꺼냅니다.
		return value == null || value.isNull() ? defaultValue : value.asInt(); // 흐름 45: 값이 없으면 기본값을 쓰고, 있으면 int로 바꿉니다.
	}
}
