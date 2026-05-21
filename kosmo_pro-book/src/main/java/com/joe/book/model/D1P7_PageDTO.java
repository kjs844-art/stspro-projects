package com.joe.book.model;

import lombok.Data;

// 📄 페이징(Paging) 및 검색 정보를 담는 DTO입니다.
// 나중에 도서 목록이 많아지면 1페이지, 2페이지 나누는 기능을 구현할 때 사용합니다.
@Data
public class D1P7_PageDTO {
    
    private int pageNum;      // 현재 페이지 번호
    private int amount;       // 한 페이지당 보여줄 게시글 개수
    
    private String type;      // 검색 타입 (제목, 저자 등)
    private String keyword;   // 검색어
    
    public D1P7_PageDTO() {
        this(1, 10); // 기본값: 1페이지, 10개씩 보여줌
    }
    
    public D1P7_PageDTO(int pageNum, int amount) {
        this.pageNum = pageNum;
        this.amount = amount;
    }
    
    // 이 클래스의 흐름:
    // 1. Controller에서 사용자가 요청한 페이지 번호를 이 객체에 담습니다.
    // 2. Mapper(XML)로 전달하여 SQL의 LIMIT 또는 OFFSET 부분에 사용합니다.
}

