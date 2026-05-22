package com.joe.fin.shadow;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.joe.fin.shadow.ShadowRiskDTO.ShadowRiskNewsDTO;

@Service
public class ShadowRiskService {
    private static final String GDELT_DOC_API = "https://api.gdeltproject.org/api/v2/doc/doc";
    private static final String DEFAULT_KEYWORD = "semiconductor";

    private final HttpClient httpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(15))
        .build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ShadowRiskDTO analyze(String keyword) {
        String cleanKeyword = clean(keyword);
        try {
            return analyzeWithGdelt(cleanKeyword);
        } catch (Exception ex) {
            return fallback(cleanKeyword);
        }
    }

    private ShadowRiskDTO analyzeWithGdelt(String keyword) throws IOException, InterruptedException {
        String query = buildQuery(keyword);
        String url = GDELT_DOC_API
            + "?query=" + URLEncoder.encode(query, StandardCharsets.UTF_8)
            + "&mode=artlist"
            + "&format=json"
            + "&maxrecords=10"
            + "&timespan=1week"
            + "&sort=datedesc";

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .timeout(Duration.ofSeconds(25))
            .header("User-Agent", "kosmo-joe-fin-study-project")
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IOException("GDELT status " + response.statusCode());
        }

        JsonNode root = objectMapper.readTree(response.body());
        JsonNode articles = root.path("articles");
        List<ShadowRiskNewsDTO> news = new ArrayList<>();
        int sanctionMentions = 0;
        int cyberMentions = 0;
        int launderingMentions = 0;

        if (articles.isArray()) {
            for (JsonNode article : articles) {
                ShadowRiskNewsDTO item = new ShadowRiskNewsDTO();
                item.setTitle(article.path("title").asText("Untitled"));
                item.setSourceCountry(article.path("sourcecountry").asText("unknown"));
                item.setDomain(article.path("domain").asText("unknown"));
                item.setUrl(article.path("url").asText("#"));
                item.setSeenDate(article.path("seendate").asText(""));
                news.add(item);

                String text = (item.getTitle() + " " + item.getDomain()).toLowerCase(Locale.ROOT);
                sanctionMentions += containsAny(text, "sanction", "blacklist", "pep") ? 1 : 0;
                cyberMentions += containsAny(text, "cyber", "ransomware", "hack", "breach", "leak") ? 1 : 0;
                launderingMentions += containsAny(text, "laundering", "illicit", "smuggling", "fraud") ? 1 : 0;
            }
        }

        int score = Math.min(100, news.size() * 6 + sanctionMentions * 12 + cyberMentions * 10 + launderingMentions * 12);

        ShadowRiskDTO dto = new ShadowRiskDTO();
        dto.setKeyword(keyword);
        dto.setScore(score);
        dto.setRiskLevel(level(score));
        dto.setArticleCount(news.size());
        dto.setSanctionMentions(sanctionMentions);
        dto.setCyberMentions(cyberMentions);
        dto.setLaunderingMentions(launderingMentions);
        dto.setDataSource("GDELT DOC 2.0 public API");
        dto.setMessage("무료 공개 뉴스 데이터로 만든 포트폴리오용 리스크 지표입니다.");
        dto.setNews(news);
        return dto;
    }

    private String buildQuery(String keyword) {
        return "(" + keyword + " OR sanctions OR laundering OR illicit OR ransomware OR breach OR cybercrime OR fraud)";
    }

    private String clean(String keyword) {
        if (keyword == null || keyword.isBlank()) {
            return DEFAULT_KEYWORD;
        }
        return keyword.trim();
    }

    private boolean containsAny(String text, String... words) {
        for (String word : words) {
            if (text.contains(word)) {
                return true;
            }
        }
        return false;
    }

    private String level(int score) {
        if (score >= 70) {
            return "HIGH";
        }
        if (score >= 35) {
            return "MEDIUM";
        }
        return "LOW";
    }

    private ShadowRiskDTO fallback(String keyword) {
        ShadowRiskDTO dto = new ShadowRiskDTO();
        dto.setKeyword(keyword);
        dto.setScore(42);
        dto.setRiskLevel("MEDIUM");
        dto.setArticleCount(3);
        dto.setSanctionMentions(1);
        dto.setCyberMentions(1);
        dto.setLaunderingMentions(1);
        dto.setDataSource("Demo fallback data");
        dto.setMessage("무료 API 응답 지연이나 사용량 제한이 있어도 화면 연습이 가능하도록 샘플 데이터를 표시합니다.");

        List<ShadowRiskNewsDTO> news = new ArrayList<>();
        news.add(sample("Sanctions and supply-chain risk memo", "US", "demo.local"));
        news.add(sample("Cyber breach signals near financial sector", "GB", "demo.local"));
        news.add(sample("Illicit finance keyword monitoring example", "KR", "demo.local"));
        dto.setNews(news);
        return dto;
    }

    private ShadowRiskNewsDTO sample(String title, String country, String domain) {
        ShadowRiskNewsDTO item = new ShadowRiskNewsDTO();
        item.setTitle(title);
        item.setSourceCountry(country);
        item.setDomain(domain);
        item.setUrl("#");
        item.setSeenDate("demo");
        return item;
    }
}
