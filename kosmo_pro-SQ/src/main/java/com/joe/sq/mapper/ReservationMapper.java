package com.joe.sq.mapper;

import com.joe.sq.dto.ReservationDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * [학습용 주석 - 4단계: Java MVC 구현 (Mapper)]
 * MyBatis Mapper 인터페이스입니다.
 * 이 인터페이스의 메서드명은 ReservationMapper.xml 파일의 id 와 정확히 일치해야 합니다.
 * @Mapper 애너테이션을 붙여야 스프링 부트가 시작될 때 이 인터페이스의 구현체를 자동으로 생성합니다.
 */
@Mapper
public interface ReservationMapper {
    
    // 예약 전체 목록 조회
    List<ReservationDto> findAll();
    
    // [추가] 특정 예약 ID로 1건의 예약 정보만 조회
    ReservationDto findById(Long id);
    
    // 예약 추가 (예약 정보 폼 제출 시 실행됨)
    void insertReservation(ReservationDto dto);
    
    // 예약 삭제 (ID로 삭제)
    void deleteReservation(Long id);
    
    // (선택) 테이블 자동 생성을 위한 메서드
    void createTableIfNotExists();
}
