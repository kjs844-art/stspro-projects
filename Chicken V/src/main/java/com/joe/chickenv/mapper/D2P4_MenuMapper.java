package com.joe.chickenv.mapper;

import java.util.List;
import com.joe.chickenv.model.D1P2_MenuDTO;
import org.apache.ibatis.annotations.Mapper;

/**
 * [미션 2] 치킨 메뉴 DB 연동을 위한 Mapper 인터페이스
 * D2: 개발 순서 2
 * P4: 프로그램 흐름 4 (DB 접근)
 */
@Mapper
public interface D2P4_MenuMapper {

    // 모든 치킨 메뉴 리스트 조회
    List<D1P2_MenuDTO> getMenuList(String category); // 카테고리별 메뉴 조회 기능 추가
    

    // 새로운 치킨 메뉴 추가
    int insertMenu(D1P2_MenuDTO menuDTO);
}
