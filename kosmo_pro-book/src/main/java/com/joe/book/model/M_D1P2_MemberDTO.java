package com.joe.book.model;

import lombok.Data;

// 이 클래스는 데이터(정보)를 담아 나르는 상자(Data Transfer Object) 역할을 합니다.
// 화면(View) <-> 컨트롤러 <-> 서비스 <-> DB 사이를 이동하며 회원 정보를 전달합니다.
@Data // 롬복(Lombok)을 사용해 Getter, Setter, toString 등을 자동으로 만들어줍니다.
public class M_D1P2_MemberDTO {
    
    // DB의 member 테이블 컬럼 이름들과 동일하게 변수명을 맞춰줍니다.
    private String username; // 회원이 사용할 아이디
    private String password; // 회원의 비밀번호
    private String name;     // 회원의 실제 이름
    private String role;     // 회원의 권한 (예: 일반유저 'USER', 관리자 'ADMIN' 등)
    
}

