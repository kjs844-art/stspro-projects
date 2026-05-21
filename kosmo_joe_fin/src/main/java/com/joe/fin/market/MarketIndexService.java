package com.joe.fin.market;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MarketIndexService {
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(4))
            .build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private volatile List<MarketIndexDTO> cachedIndices = List.of();
    private volatile LocalDateTime cacheTime = LocalDateTime.MIN;

    public List<MarketIndexDTO> getIndices() {
        if (!cachedIndices.isEmpty() && cacheTime.plusSeconds(45).isAfter(LocalDateTime.now())) {
            return cachedIndices;
        }

        List<IndexSpec> specs = specs();
        List<CompletableFuture<MarketIndexDTO>> futures = specs.stream()
                .map(spec -> CompletableFuture.supplyAsync(() -> fetchOrFallback(spec)))
                .toList();

        List<MarketIndexDTO> result = futures.stream()
                .map(CompletableFuture::join)
                .toList();
        cachedIndices = result;
        cacheTime = LocalDateTime.now();
        return result;
    }

    private MarketIndexDTO fetchOrFallback(IndexSpec spec) {
        try {
            return fetch(spec);
        } catch (Exception ignored) {
            return fallback(spec);
        }
    }

    private MarketIndexDTO fetch(IndexSpec spec) throws IOException, InterruptedException {
        String encodedSymbol = URLEncoder.encode(spec.yahooSymbol(), StandardCharsets.UTF_8);
        URI uri = URI.create("https://query1.finance.yahoo.com/v8/finance/chart/"
                + encodedSymbol + "?range=1d&interval=1m");
        HttpRequest request = HttpRequest.newBuilder(uri)
                .timeout(Duration.ofSeconds(6))
                .header("User-Agent", "Mozilla/5.0")
                .GET()
                .build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IOException("Yahoo chart API status " + response.statusCode());
        }

        JsonNode meta = objectMapper.readTree(response.body())
                .path("chart").path("result").path(0).path("meta");
        BigDecimal price = decimal(meta.path("regularMarketPrice"));
        if (price.signum() <= 0) {
            throw new IOException("Yahoo chart API returned empty price for " + spec.yahooSymbol());
        }
        BigDecimal previousClose = decimal(meta.path("chartPreviousClose"));
        if (previousClose.signum() == 0) {
            previousClose = decimal(meta.path("previousClose"));
        }
        BigDecimal changePercent = BigDecimal.ZERO;
        if (previousClose.signum() != 0) {
            changePercent = price.subtract(previousClose)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(previousClose, 4, RoundingMode.HALF_UP);
        }

        return new MarketIndexDTO(
                spec.sym(),
                spec.yahooSymbol(),
                spec.region(),
                spec.color(),
                price.setScale(2, RoundingMode.HALF_UP),
                changePercent.setScale(2, RoundingMode.HALF_UP),
                "YAHOO",
                LocalDateTime.now().toString());
    }

    private MarketIndexDTO fallback(IndexSpec spec) {
        return new MarketIndexDTO(
                spec.sym(),
                spec.yahooSymbol(),
                spec.region(),
                spec.color(),
                BigDecimal.valueOf(spec.base()).setScale(2, RoundingMode.HALF_UP),
                BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP),
                "FALLBACK",
                LocalDateTime.now().toString());
    }

    private BigDecimal decimal(JsonNode node) {
        if (node == null || node.isMissingNode() || node.isNull()) {
            return BigDecimal.ZERO;
        }
        return BigDecimal.valueOf(node.asDouble());
    }

    private List<IndexSpec> specs() {
        return List.of(
                new IndexSpec("NASDAQ", "^IXIC", "US", "#6ad8ff", 19433.18),
                new IndexSpec("S&P 500", "^GSPC", "US", "#6ad8ff", 6014.55),
                new IndexSpec("DOW 30", "^DJI", "US", "#6ad8ff", 44918.20),
                new IndexSpec("NYSE", "^NYA", "US", "#6ad8ff", 18021.74),
                new IndexSpec("RUSSELL 3K", "^RUA", "US", "#a07cff", 3458.92),
                new IndexSpec("RUSSELL 2K", "^RUT", "US", "#a07cff", 2384.10),
                new IndexSpec("NIKKEI 225", "^N225", "JP", "#ff4d6d", 38461.55),
                new IndexSpec("TOPIX", "^TOPX", "JP", "#ff4d6d", 2710.42),
                new IndexSpec("JASDAQ", "1551.T", "JP", "#ff4d6d", 175.32),
                new IndexSpec("KOSPI", "^KS11", "KR", "#ff4dff", 2654.18),
                new IndexSpec("KOSDAQ", "^KQ11", "KR", "#ff4dff", 854.22),
                new IndexSpec("KOSPI 200", "^KS200", "KR", "#ff4dff", 354.81),
                new IndexSpec("SSE COMP", "000001.SS", "CN", "#ff7d4d", 3284.66),
                new IndexSpec("STAR 50", "000688.SS", "CN", "#ff7d4d", 824.05),
                new IndexSpec("SZSE COMP", "399001.SZ", "CN", "#ffb84d", 1986.31),
                new IndexSpec("CHINEXT", "399006.SZ", "CN", "#ffb84d", 2104.78),
                new IndexSpec("CSI 300", "000300.SS", "CN", "#ffb84d", 3902.04),
                new IndexSpec("HSI", "^HSI", "HK", "#ffd84d", 19872.41),
                new IndexSpec("HSCEI", "^HSCE", "HK", "#ffd84d", 7034.92),
                new IndexSpec("HSTECH", "^HSTECH", "HK", "#ffd84d", 4218.30),
                new IndexSpec("ASX 200", "^AXJO", "AU", "#2ee6a0", 7892.10),
                new IndexSpec("ALL ORDS", "^AORD", "AU", "#2ee6a0", 8156.42),
                new IndexSpec("S&P/ASX 50", "^AFLI", "AU", "#2ee6a0", 7438.65));
    }

    private record IndexSpec(String sym, String yahooSymbol, String region, String color, double base) {
    }
}
