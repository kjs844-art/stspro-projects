package com.joe.fin.watchlist;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WatchlistMapper {
	List<WatchlistDTO> findByMemberId(Integer memberId);

	int insert(WatchlistDTO watchlist);

	int delete(WatchlistDTO watchlist);
}
