package com.joe._8.mapper;

import com.joe._8.reservation.ReservationDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * [EXPLAIN-CODE 002] Mapper.java
 * Java 메서드 이름과 ReservationMapper.xml의 id가 1:1로 연결됩니다.
 */
@Mapper
public interface ReservationMapper {

    void createTableIfNotExists();

    List<ReservationDTO> findAll();

    void insertReservation(ReservationDTO reservationDTO);

    void deleteReservation(Long id);
}
