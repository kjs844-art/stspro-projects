package com.joe.sq.controller;

import com.joe.sq.dto.ReservationDto;
import com.joe.sq.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * [학습용 주석 - 4단계: Java MVC 구현 (Controller)]
 * 사용자의 브라우저 요청(URL)을 받아 적절한 JSP 화면이나 Service 로직으로 연결하는 컨트롤러입니다.
 */
@Controller
@RequestMapping("/oopo")
public class OopoController {

    @Autowired
    private ReservationService reservationService;

    // 1. 메인 화면 (GET /oopo)
    @GetMapping
    public String oopoMain() {
        // oopo.jsp 파일을 찾아 렌더링합니다. (prefix/suffix 설정에 따라 /WEB-INF/views/oopo.jsp)
        return "oopo";
    }

    // 2. 메뉴 화면 (GET /oopo/menu)
    @GetMapping("/menu")
    public String oopoMenu() {
        return "oopo-menu";
    }

    // 3. 예약 화면 및 목록 보기 (GET /oopo/booking)
    @GetMapping("/booking")
    public String oopoBooking(Model model) {
        // DB에서 예약 목록을 가져와 "reservations" 라는 이름으로 모델에 담아 JSP로 넘깁니다.
        List<ReservationDto> reservations = reservationService.getAllReservations();
        model.addAttribute("reservations", reservations);
        return "oopo-booking";
    }

    // 4. 예약 추가 (POST /oopo/booking)
    // JSP 폼에서 submit 을 누르면 이 곳으로 데이터가 전송됩니다.
    @PostMapping("/booking")
    public String addBooking(ReservationDto dto) {
        reservationService.addReservation(dto);
        // 저장이 완료되면 다시 예약 화면으로 리다이렉트(새로고침) 하여 추가된 목록을 보여줍니다.
        return "redirect:/oopo/booking";
    }

    // 5. 예약 삭제 (POST /oopo/booking/delete)
    @PostMapping("/booking/delete")
    public String deleteBooking(Long id) {
        reservationService.deleteReservation(id);
        return "redirect:/oopo/booking";
    }

    // 6. 단일 예약 정보 보기 (GET /oopo/booking/{id})
    @GetMapping("/booking/{id}")
    public String oopoBookingDetail(@PathVariable("id") Long id, Model model) {
        ReservationDto reservation = reservationService.getReservationById(id);
        model.addAttribute("reservation", reservation);
        return "oopo-detail";
    }
}
