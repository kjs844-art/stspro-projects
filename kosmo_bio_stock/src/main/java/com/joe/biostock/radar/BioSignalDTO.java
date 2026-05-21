package com.joe.biostock.radar;

public class BioSignalDTO {

	private String category; // 흐름 22: JSP의 분야 칸에 출력할 데이터입니다.
	private String keyword; // 흐름 23: JSP의 키워드 칸에 출력하고 검색에도 사용하는 데이터입니다.
	private String title; // 흐름 24: JSP의 제목 칸에 출력할 신호 설명입니다.
	private String source; // 흐름 25: 이 데이터가 어디서 온 것처럼 보여줄지 나타내는 출처입니다.
	private String signalType; // 흐름 26: 기회, 주의, 리스크 같은 판단 표시입니다.
	private String reason; // 흐름 27: 왜 이 신호를 봐야 하는지 설명하는 문장입니다.
	private int score; // 흐름 28: 신호의 중요도를 숫자로 보여주는 점수입니다.

	public BioSignalDTO(String category, String keyword, String title, String source, String signalType, String reason, int score) {
		this.category = category; // 흐름 29: 생성자로 받은 category 값을 DTO 멤버변수에 저장합니다.
		this.keyword = keyword; // 흐름 30: 생성자로 받은 keyword 값을 DTO 멤버변수에 저장합니다.
		this.title = title; // 흐름 31: 생성자로 받은 title 값을 DTO 멤버변수에 저장합니다.
		this.source = source; // 흐름 32: 생성자로 받은 source 값을 DTO 멤버변수에 저장합니다.
		this.signalType = signalType; // 흐름 33: 생성자로 받은 signalType 값을 DTO 멤버변수에 저장합니다.
		this.reason = reason; // 흐름 34: 생성자로 받은 reason 값을 DTO 멤버변수에 저장합니다.
		this.score = score; // 흐름 35: 생성자로 받은 score 값을 DTO 멤버변수에 저장합니다.
	}

	public String getSearchText() {
		return category + " " + keyword + " " + title + " " + source + " " + signalType + " " + reason; // 흐름 36: Service가 검색할 수 있게 주요 글자 데이터를 한 문장으로 합칩니다.
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getSignalType() {
		return signalType;
	}

	public void setSignalType(String signalType) {
		this.signalType = signalType;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
}
