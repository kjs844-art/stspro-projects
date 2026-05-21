package com.joe.fin.etf;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ETFService {
	public ETFDTO getEtfData(String ticker) {
		if ("SPY".equalsIgnoreCase(ticker)) {
			return create("SPY", "SPDR S&P 500 ETF Trust", "US Large Cap", "0.09",
				List.of("Microsoft", "NVIDIA", "Apple", "Amazon", "Meta", "Broadcom", "Alphabet", "Berkshire Hathaway"));
		}
		if ("VOO".equalsIgnoreCase(ticker)) {
			return create("VOO", "Vanguard S&P 500 ETF", "US Large Cap", "0.03",
				List.of("Microsoft", "NVIDIA", "Apple", "Amazon", "Meta", "Broadcom", "Alphabet", "Berkshire Hathaway"));
		}
		if ("QQQ".equalsIgnoreCase(ticker)) {
			return create("QQQ", "Invesco QQQ Trust", "US Growth / Nasdaq 100", "0.20",
				List.of("Microsoft", "NVIDIA", "Apple", "Broadcom", "Amazon", "Meta", "Netflix", "Costco"));
		}
		return create(ticker, "ETF data temporarily unavailable", "Unknown", "0.00",
			List.of("External data source will be connected later"));
	}

	private ETFDTO create(String ticker, String name, String category, String expenseRatio, List<String> holdings) {
		ETFDTO dto = new ETFDTO();
		dto.setTicker(ticker);
		dto.setName(name);
		dto.setCategory(category);
		dto.setExpenseRatio(new BigDecimal(expenseRatio));
		dto.setAccessLevel("FREE: basic info / PREMIUM: holdings and reports");
		dto.setTopHoldings(holdings);
		return dto;
	}
}
