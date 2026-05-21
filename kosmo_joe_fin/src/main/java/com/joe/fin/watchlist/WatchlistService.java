package com.joe.fin.watchlist;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class WatchlistService {
	private static final int DEMO_MEMBER_ID = 1;

	private final WatchlistMapper watchlistMapper;

	public WatchlistService(WatchlistMapper watchlistMapper) {
		this.watchlistMapper = watchlistMapper;
	}

	public List<WatchlistDTO> list() {
		return watchlistMapper.findByMemberId(DEMO_MEMBER_ID);
	}

	public int save(WatchlistDTO watchlist) {
		watchlist.setMemberId(DEMO_MEMBER_ID);
		watchlist.setSymbol(watchlist.getSymbol().trim().toUpperCase());
		return watchlistMapper.insert(watchlist);
	}

	public int delete(Integer watchlistId) {
		WatchlistDTO watchlist = new WatchlistDTO();
		watchlist.setMemberId(DEMO_MEMBER_ID);
		watchlist.setWatchlistId(watchlistId);
		return watchlistMapper.delete(watchlist);
	}
}
