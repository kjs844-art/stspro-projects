package com.joe.fin.watchlist;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WatchlistDTO {
	private Integer watchlistId;
	private Integer memberId;
	private String symbol;
	private String assetType;
	private String memo;
	private LocalDateTime createdAt;
}
