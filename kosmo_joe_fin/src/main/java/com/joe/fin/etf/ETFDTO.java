package com.joe.fin.etf;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ETFDTO {
	private String ticker;
	private String name;
	private String category;
	private BigDecimal expenseRatio;
	private String accessLevel;
	private List<String> topHoldings;
}
