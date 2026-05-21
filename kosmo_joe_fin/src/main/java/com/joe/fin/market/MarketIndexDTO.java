package com.joe.fin.market;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MarketIndexDTO {
    private String sym;
    private String yahooSymbol;
    private String region;
    private String color;
    private BigDecimal value;
    private BigDecimal changePercent;
    private String source;
    private String updatedAt;
}
