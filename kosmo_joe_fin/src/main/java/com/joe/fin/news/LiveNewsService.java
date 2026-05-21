package com.joe.fin.news;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

@Service
public class LiveNewsService {
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    public List<LiveNewsDTO> getNews(String category) {
        String keyword = keyword(category);
        try {
            String encoded = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            URI uri = URI.create("https://news.google.com/rss/search?q=" + encoded + "&hl=ko&gl=KR&ceid=KR:ko");
            HttpRequest request = HttpRequest.newBuilder(uri)
                    .timeout(Duration.ofSeconds(8))
                    .header("User-Agent", "Mozilla/5.0")
                    .GET()
                    .build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                return fallback(category);
            }
            return parse(response.body());
        } catch (Exception ignored) {
            return fallback(category);
        }
    }

    private List<LiveNewsDTO> parse(String xml) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
        Document document = factory.newDocumentBuilder()
                .parse(new ByteArrayInputStream(xml.getBytes(StandardCharsets.UTF_8)));
        NodeList items = document.getElementsByTagName("item");
        List<LiveNewsDTO> news = new ArrayList<>();
        for (int i = 0; i < Math.min(items.getLength(), 10); i++) {
            Element item = (Element) items.item(i);
            String title = text(item, "title");
            String source = title.contains(" - ") ? title.substring(title.lastIndexOf(" - ") + 3) : "Google News";
            String cleanTitle = title.contains(" - ") ? title.substring(0, title.lastIndexOf(" - ")) : title;
            news.add(new LiveNewsDTO(
                    cleanTitle,
                    source,
                    text(item, "link"),
                    text(item, "pubDate"),
                    stripHtml(text(item, "description"))));
        }
        return news.isEmpty() ? fallback("current") : news;
    }

    private String text(Element element, String tagName) {
        NodeList nodes = element.getElementsByTagName(tagName);
        if (nodes.getLength() == 0 || nodes.item(0) == null) {
            return "";
        }
        return nodes.item(0).getTextContent();
    }

    private String stripHtml(String value) {
        return value == null ? "" : value.replaceAll("<[^>]+>", " ").replaceAll("\\s+", " ").trim();
    }

    private String keyword(String category) {
        return Map.of(
                "current", "시사상식 주요뉴스",
                "economy", "경제 금리 환율 물가",
                "politics", "정치 정책 국회",
                "tech", "인공지능 반도체 IT",
                "market", "증시 주식 시장").getOrDefault(category, "시사상식 주요뉴스");
    }

    private List<LiveNewsDTO> fallback(String category) {
        return List.of(new LiveNewsDTO(
                "뉴스 API 임시 대기",
                "KOSMO",
                "",
                LocalDateTime.now().toString(),
                category + " 카테고리 뉴스 API 연결이 잠시 실패했습니다. 화면 구조는 유지되고 다음 새로고침 때 다시 요청합니다."));
    }
}
