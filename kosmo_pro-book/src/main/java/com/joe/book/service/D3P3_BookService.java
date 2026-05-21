package com.joe.book.service;

import java.util.List;
import com.joe.book.model.D1P2_BookDTO;

// 🛠️ 도서 관리의 업무 로직(Business Logic)을 정의하는 명세서(Interface)입니다.
// 왜 인터페이스를 쓰나요? 유지보수가 편해지고, 나중에 다른 기능으로 갈아끼우기 좋아서 사용합니다!
public interface D3P3_BookService {

    // 도서 전체 목록 가져오기 업무
    List<D1P2_BookDTO> selectAll() throws Exception;

    // 도서 1권 상세 조회 업무
    D1P2_BookDTO selectOne(int id) throws Exception;

    // 도서 등록 업무
    int insert(D1P2_BookDTO bookDTO) throws Exception;

    // 도서 수정 업무
    int update(D1P2_BookDTO bookDTO) throws Exception;

    // 도서 삭제 업무
    int delete(int id) throws Exception;
}

