package com.joe.fin.news;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsDTO {
	private String symbol;
	private String title;
	private String source;
	private String summary;
	private String url;

}
