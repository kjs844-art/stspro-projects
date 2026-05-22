package com.joe.fin.market;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MarketPageController {
    private static final Map<String, MarketSpot> MARKETS = Map.ofEntries(
            spot("NYC", "New York", "United States", "NYSE / NASDAQ", "NASDAQ", "^IXIC",
                    "미국 대형 기술주와 글로벌 유동성의 중심 시장입니다.", List.of("NASDAQ", "S&P 500", "DOW 30", "NYSE")),
            spot("SEA", "Seattle", "United States", "NASDAQ / Russell", "RUSSELL 3000", "^RUA",
                    "미국 성장주와 중소형주 흐름을 같이 보는 보조 거점입니다.", List.of("RUSSELL 3000", "RUSSELL 2000")),
            spot("TYO", "Tokyo", "Japan", "Tokyo Stock Exchange", "NIKKEI 225", "^N225",
                    "일본 대표 지수와 엔화, 반도체 장비주 흐름을 보는 시장입니다.", List.of("NIKKEI 225", "TOPIX", "JASDAQ")),
            spot("SEL", "Seoul", "South Korea", "KRX", "KOSPI", "^KS11",
                    "한국 대형주, 반도체, 2차전지 흐름을 확인하는 시장입니다.", List.of("KOSPI", "KOSDAQ", "KOSPI 200")),
            spot("SHA", "Shanghai", "China", "Shanghai Stock Exchange", "SSE COMP", "000001.SS",
                    "중국 본토 대형주와 정책 영향을 보는 대표 시장입니다.", List.of("SSE COMP", "STAR 50")),
            spot("SZX", "Shenzhen", "China", "Shenzhen Stock Exchange", "SZSE COMP", "399001.SZ",
                    "중국 성장주, 제조업, 기술주 흐름을 보는 시장입니다.", List.of("SZSE COMP", "CHINEXT", "CSI 300")),
            spot("HKG", "Hong Kong", "Hong Kong", "HKEX", "HSI", "^HSI",
                    "중국 빅테크와 글로벌 자금 흐름이 만나는 시장입니다.", List.of("HSI", "HSCEI", "HSTECH")),
            spot("TPE", "Taipei", "Taiwan", "TWSE", "TWSE", "^TWII",
                    "TSMC 중심의 반도체 공급망 흐름을 보는 시장입니다.", List.of("TWSE", "TPEX")),
            spot("SYD", "Sydney", "Australia", "ASX", "ASX 200", "^AXJO",
                    "호주 원자재, 금융, 아시아 태평양 흐름을 같이 보는 시장입니다.", List.of("ASX 200", "ALL ORDS")),
            spot("LON", "London", "United Kingdom", "LSE", "FTSE 100", "^FTSE",
                    "유럽 금융과 글로벌 원자재 기업 흐름을 보는 시장입니다.", List.of("FTSE 100", "FTSE 250")),
            spot("FRA", "Frankfurt", "Germany", "XETRA", "DAX", "^GDAXI",
                    "독일 제조업과 유럽 경기 민감주 흐름을 보는 시장입니다.", List.of("DAX", "MDAX")),
            spot("PAR", "Paris", "France", "Euronext Paris", "CAC 40", "^FCHI",
                    "프랑스 대형주와 유럽 소비재 흐름을 보는 시장입니다.", List.of("CAC 40")),
            spot("BOM", "Mumbai", "India", "BSE / NSE", "SENSEX", "^BSESN",
                    "인도 성장주와 내수 시장 흐름을 보는 시장입니다.", List.of("SENSEX", "NIFTY 50")),
            spot("SGP", "Singapore", "Singapore", "SGX", "STI", "^STI",
                    "동남아 금융 허브와 아시아 리스크 흐름을 보는 시장입니다.", List.of("STI")),
            spot("TOR", "Toronto", "Canada", "TSX", "TSX", "^GSPTSE",
                    "캐나다 금융, 에너지, 원자재 흐름을 보는 시장입니다.", List.of("TSX")),
            spot("SAO", "Sao Paulo", "Brazil", "B3", "BOVESPA", "^BVSP",
                    "브라질 원자재, 신흥국 자금 흐름을 보는 시장입니다.", List.of("BOVESPA")));

    @GetMapping("/market")
    public String detail(@RequestParam(defaultValue = "NYC") String id, Model model) {
        String key = id.trim().toUpperCase();
        MarketSpot market = MARKETS.getOrDefault(key, MARKETS.get("NYC"));
        model.addAttribute("market", market);
        return "market/detail";
    }

    private static Map.Entry<String, MarketSpot> spot(String id, String city, String country, String exchange,
            String primaryIndex, String yahooSymbol, String summary, List<String> indices) {
        return Map.entry(id, new MarketSpot(id, city, country, exchange, primaryIndex, yahooSymbol, summary, indices));
    }

    public static class MarketSpot {
        private final String id;
        private final String city;
        private final String country;
        private final String exchange;
        private final String primaryIndex;
        private final String yahooSymbol;
        private final String summary;
        private final List<String> indices;

        public MarketSpot(String id, String city, String country, String exchange, String primaryIndex,
                String yahooSymbol, String summary, List<String> indices) {
            this.id = id;
            this.city = city;
            this.country = country;
            this.exchange = exchange;
            this.primaryIndex = primaryIndex;
            this.yahooSymbol = yahooSymbol;
            this.summary = summary;
            this.indices = indices;
        }

        public String getId() {
            return id;
        }

        public String getCity() {
            return city;
        }

        public String getCountry() {
            return country;
        }

        public String getExchange() {
            return exchange;
        }

        public String getPrimaryIndex() {
            return primaryIndex;
        }

        public String getYahooSymbol() {
            return yahooSymbol;
        }

        public String getSummary() {
            return summary;
        }

        public List<String> getIndices() {
            return indices;
        }
    }
}
