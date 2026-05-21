package com.joe.chickenv.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * [미션 1] 치킨 메뉴 정보를 담는 DTO 클래스
 * D1: 개발 순서 1 (첫 번째 작성 파일)
 * P2: 프로그램 흐름 2 (데이터 규격)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class D1P2_MenuDTO {

    private Long menuId;        // 메뉴 고유 번호
    private String menuName;    // 메뉴 이름
    private int price;          // 가격
    private String description; // 메뉴 설명
    private String category;    // 카테고리 (후라이드, 양념, 사이드 등)
    
    private boolean isGlutenFree; // 글루텐 프리 여부
    private boolean isVegan;      // 비건 가능 여부
    private String allergyInfo;   // 알레르기 유발 정보 (예: 땅콩, 대두 함유)
    
    private String imageUrl;     // 치킨 이미지 주소
}
