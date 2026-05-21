package com.joe.book.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// 📖 Book(도서) 정보를 담는 가방(DTO)입니다.
// DB의 book 테이블의 한 줄(레코드) 데이터를 자바 객체로 변환해주는 역할을 합니다.
@Data // Getter, Setter, toString, equals, hashCode를 자동으로 만들어줍니다.
@NoArgsConstructor // 파라미터가 없는 기본 생성자를 만듭니다.
@AllArgsConstructor // 모든 필드를 파라미터로 받는 생성자를 만듭니다.
@Builder // 빌더 패턴을 사용할 수 있게 해줍니다. (객체 생성을 가독성 있게!)
public class D1P2_BookDTO {

    private int id;            // 도서 고유 번호 (PK, 자동증가)
    private String title;      // 도서 제목
    private String author;     // 저자 이름
    private String publisher;  // 출판사 이름
    private String category;   // 도서 카테고리 (필요시 사용)
    private int price;         // 도서 가격 (필요시 사용)
    
    // 이 클래스의 데이터 흐름:
    // 1. [DB] -> [MyBatis] -> [BookDTO] : DB의 데이터를 담아서 화면(JSP)으로 가져갈 때
    // 2. [JSP] -> [Controller] -> [BookDTO] : 사용자가 폼에 입력한 데이터를 서버로 보낼 때
}

