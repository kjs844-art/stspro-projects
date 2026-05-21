package com.joe._8.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * [EXPLAIN-CODE 001] DTO
 * JSP 예약 폼의 name 값과 DB 컬럼 사이를 옮겨 다니는 "예약 데이터 박스"입니다.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private String name;
    private String phone;
    private Integer guests;
    private String bookDate;
    private String bookTime;
}
