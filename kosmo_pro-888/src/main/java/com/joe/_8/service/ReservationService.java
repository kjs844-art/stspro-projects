package com.joe._8.service;

import com.joe._8.mapper.ReservationMapper;
import com.joe._8.reservation.ReservationDTO;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * [EXPLAIN-CODE 003] Service
 * Controller와 Mapper 사이에서 예약 기능의 실제 일을 맡습니다.
 */
@Service
public class ReservationService {

    private final ReservationMapper reservationMapper;

    public ReservationService(ReservationMapper reservationMapper) {
        this.reservationMapper = reservationMapper;
    }

    @PostConstruct
    public void init() {
        reservationMapper.createTableIfNotExists();
    }

    public List<ReservationDTO> getReservations() {
        return reservationMapper.findAll();
    }

    public void addReservation(ReservationDTO reservationDTO) {
        reservationMapper.insertReservation(reservationDTO);
    }

    public void deleteReservation(Long id) {
        reservationMapper.deleteReservation(id);
    }
}
