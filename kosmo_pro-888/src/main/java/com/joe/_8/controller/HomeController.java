package com.joe._8.controller;

import com.joe._8.reservation.ReservationDTO;
import com.joe._8.service.ReservationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

/**
 * [EXPLAIN-CODE 005] Controller
 * 브라우저 URL 요청을 받아서 JSP 화면 또는 Service 로직으로 연결합니다.
 */
@Controller
public class HomeController {

    private final ReservationService reservationService;

    public HomeController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/")
    public String home() {
        return "Home";
    }

    @GetMapping("/menu")
    public String menu() {
        return "Menu";
    }

    @GetMapping("/booking")
    public String booking(Model model) {
        List<ReservationDTO> reservations = reservationService.getReservations();
        model.addAttribute("reservations", reservations);
        return "Booking";
    }

    @PostMapping("/booking")
    public String addBooking(ReservationDTO reservationDTO) {
        reservationService.addReservation(reservationDTO);
        return "redirect:/booking";
    }

    @PostMapping("/booking/delete")
    public String deleteBooking(Long id) {
        reservationService.deleteReservation(id);
        return "redirect:/booking";
    }
}
