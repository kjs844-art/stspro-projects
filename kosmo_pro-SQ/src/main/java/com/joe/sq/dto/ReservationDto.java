package com.joe.sq.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * [학습용 주석 - 4단계: Java MVC 구현 (DTO)]
 * DTO (Data Transfer Object)
 * 데이터베이스의 테이블(예약 테이블)과 매핑되는 자바 객체입니다.
 * Lombok의 @Data 애너테이션을 사용하여 Getter/Setter, toString 등을 자동 생성합니다.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Long id;            // 예약 고유 ID (Primary Key)
    private String name;        // 예약자 이름
    private String phone;       // 연락처
    private Integer guests;     // 예약 인원
    private String bookDate;    // 예약 날짜 (yyyy-MM-dd)
    private String bookTime;    // 예약 시간 (HH:mm)
}
