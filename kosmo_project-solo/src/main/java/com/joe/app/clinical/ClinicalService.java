package com.joe.app.clinical;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/*
 * ================================================================
 * [Phase 3] - 파일 (11)번 : ClinicalService.java
 * ================================================================
 *
 * [왜 이 파일이 11번째로 만들어지나?]
 *
 * ClinicalDTO(10번)가 준비되었으니
 * 그 DTO에 담을 실제 데이터를 가져오는 Service를 만든다.
 * Phase 2의 StockService와 완전히 동일한 원리다.
 *
 * ----------------------------------------------------------------
 * [이 파일 안에 무슨 코드가 들어가나?]
 *
 * ① @Service 어노테이션
 *
 * ② public List<ClinicalDTO> searchTrials(String keyword) 메서드
 *    → keyword = 검색할 질환명 (예: "lung cancer", "diabetes")
 *    → ClinicalTrials.gov API 호출
 *    → JSON 응답에서 데이터 파싱
 *    → List<ClinicalDTO>로 반환
 *
 * ③ API URL 조립 방법:
 *    String url = "https://clinicaltrials.gov/api/v2/studies"
 *               + "?query.term=" + keyword
 *               + "&pageSize=10";
 *
 * ④ JSON 파싱 방법 (Jackson 사용):
 *    RestTemplate으로 JSON 문자열을 받아옴
 *    → ObjectMapper / JsonNode로 파싱
 *    → 각 study에서 필요한 필드 추출
 *    → ClinicalDTO에 담기
 *
 * ----------------------------------------------------------------
 * [Phase 2 vs Phase 3 비교]
 *
 * | 항목           | Phase 2 (Stock)      | Phase 3 (Clinical)           |
 * |----------------|----------------------|------------------------------|
 * | API 종류       | AlphaVantage (유료)  | ClinicalTrials.gov (무료)    |
 * | API 키 필요?   | 필요                 | 불필요                       |
 * | 반환 개수      | 1개 (단일 주식)      | 여러 개 (List<ClinicalDTO>)  |
 * | 반환 타입      | StockDTO             | List<ClinicalDTO>            |
 *
 * → 단일 객체 vs 목록을 반환하는 Service를 모두 경험!
 *
 * ----------------------------------------------------------------
 * [List<ClinicalDTO> 이해]
 *
 * 임상시험 검색 결과는 여러 개가 나온다.
 * 여러 개의 ClinicalDTO를 담으려면 List가 필요하다.
 *
 * List<ClinicalDTO> results = new ArrayList<>();
 * results.add(dto1);  ← 첫 번째 임상시험
 * results.add(dto2);  ← 두 번째 임상시험
 * return results;     ← 목록 전체 반환
 *
 * JSP에서는 <c:forEach> 태그로 목록을 하나씩 꺼내서 출력
 *
 * ----------------------------------------------------------------
 * [다음에 만들 파일]
 *
 * → (12)번 ClinicalController.java
 *    이유: Service가 준비됐으니 URL 요청을 받아서
 *    Service를 호출하고 결과를 JSP로 전달하는 Controller를 만든다.
 *
 * ================================================================
 */

@Service

public class ClinicalService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<ClinicalDTO> searchTrials(String keyword) {
        String searchKeyword = normalizeKeyword(keyword);

        try {
            String encodedKeyword = URLEncoder.encode(searchKeyword, StandardCharsets.UTF_8);
            String url = "https://clinicaltrials.gov/api/v2/studies"
                + "?query.term=" + encodedKeyword
                + "&pageSize=5";

            String json = restTemplate.getForObject(url, String.class);
            return parseTrials(json);
        } catch (Exception e) {
            return sampleTrials(searchKeyword);
        }
    }

    private String normalizeKeyword(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return "cancer";
        }

        return keyword.trim();
    }

    private List<ClinicalDTO> parseTrials(String json) throws Exception {
        List<ClinicalDTO> results = new ArrayList<>();

        JsonNode root = objectMapper.readTree(json);
        JsonNode studies = root.path("studies");

        for (JsonNode study : studies) {
            JsonNode protocol = study.path("protocolSection");
            JsonNode identification = protocol.path("identificationModule");
            JsonNode status = protocol.path("statusModule");
            JsonNode conditions = protocol.path("conditionsModule").path("conditions");
            JsonNode phases = protocol.path("designModule").path("phases");

            ClinicalDTO dto = new ClinicalDTO();
            dto.setNctId(textOrDefault(identification.path("nctId"), "-"));
            dto.setBriefTitle(textOrDefault(identification.path("briefTitle"), "제목 없음"));
            dto.setOverallStatus(textOrDefault(status.path("overallStatus"), "UNKNOWN"));
            dto.setPhase(firstArrayText(phases, "N/A"));
            dto.setCondition(firstArrayText(conditions, "N/A"));

            results.add(dto);
        }

        if (results.isEmpty()) {
            return sampleTrials("cancer");
        }

        return results;
    }

    private String textOrDefault(JsonNode node, String defaultValue) {
        if (node == null || node.isMissingNode() || node.isNull()) {
            return defaultValue;
        }

        String value = node.asText();
        return value == null || value.isBlank() ? defaultValue : value;
    }

    private String firstArrayText(JsonNode arrayNode, String defaultValue) {
        if (arrayNode == null || !arrayNode.isArray() || arrayNode.isEmpty()) {
            return defaultValue;
        }

        return textOrDefault(arrayNode.get(0), defaultValue);
    }

    private List<ClinicalDTO> sampleTrials(String keyword) {
        List<ClinicalDTO> results = new ArrayList<>();

        ClinicalDTO first = new ClinicalDTO();
        first.setNctId("SAMPLE-001");
        first.setBriefTitle("Sample clinical signal for " + keyword);
        first.setOverallStatus("RECRUITING");
        first.setPhase("PHASE2");
        first.setCondition(keyword);
        results.add(first);

        ClinicalDTO second = new ClinicalDTO();
        second.setNctId("SAMPLE-002");
        second.setBriefTitle("Sample late-stage study for " + keyword);
        second.setOverallStatus("ACTIVE_NOT_RECRUITING");
        second.setPhase("PHASE3");
        second.setCondition(keyword);
        results.add(second);

        return results;
    }

}
