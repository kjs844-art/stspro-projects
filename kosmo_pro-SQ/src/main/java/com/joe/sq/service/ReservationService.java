package com.joe.sq.service;

import com.joe.sq.dto.ReservationDto;
import com.joe.sq.mapper.ReservationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.List;

/**
 * [학습용 주석 - 4단계: Java MVC 구현 (Service)]
 * Service 클래스
 * 비즈니스 로직을 처리하는 계층입니다. Controller와 Mapper(DB) 사이에서 데이터를 가공하거나
 * 부가적인 작업을 수행합니다.
 * @Service 애너테이션을 붙이면 스프링이 빈(Bean)으로 관리합니다.
 */
@Service
public class ReservationService {

    @Autowired
    private ReservationMapper reservationMapper;

    // 프로그램이 시작될 때 한 번 실행되어 테이블이 없으면 생성하는 기능
    @PostConstruct
    public void init() {
        reservationMapper.createTableIfNotExists();
    }

    // 예약 전체 목록 가져오기
    public List<ReservationDto> getAllReservations() {
        return reservationMapper.findAll();
    }

    // [추가] 특정 예약 가져오기
    public ReservationDto getReservationById(Long id) {
        return reservationMapper.findById(id);
    }

    // 새로운 예약 추가하기
    public void addReservation(ReservationDto dto) {
        reservationMapper.insertReservation(dto);
        System.out.println("DB에 예약 저장: " + dto);
    }

    // 특정 예약 삭제하기
    public void deleteReservation(Long id) {
        reservationMapper.deleteReservation(id);
        System.out.println("DB에서 예약 삭제 ID: " + id);
    }
}
