package com.kosmo.pro888.reservation;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReservationDTO {
    private Long resId;
    private String customerName;
    private String phone;
    private LocalDateTime resTime;
    private Integer headCount;
}
