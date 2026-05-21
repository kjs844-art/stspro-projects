package com.joe.book.schedule;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

// 이 클래스는 특정 시간이나 주기에 맞춰 자동으로 실행되어야 하는 작업(스케줄러)을 담당합니다.
// 예를 들어, 매일 자정에 오래된 로그를 지우거나, 통계를 내는 등의 백그라운드 작업을 할 때 사용합니다.
@Component // 스프링이 이 클래스를 객체로 만들어서 관리하도록 합니다.
@EnableScheduling // 스프링 스케줄링 기능을 켜줍니다.
public class D7P10_BookScheduler {

    // @Scheduled는 정해진 규칙에 따라 아래의 메서드를 자동으로 실행하라는 뜻입니다.
    // fixedRate = 60000 은 '이전에 실행된 시간과 상관없이 60초(60000밀리초)마다 한 번씩 무조건 실행해!'라는 의미입니다.
    // (cron 표현식을 사용하면 "매일 아침 9시"와 같이 구체적인 지정도 가능합니다.)
    @Scheduled(fixedRate = 60000)
    public void printCurrentTime() {
        // 현재 시간을 구해서 콘솔(출력창)에 찍어줍니다.
        // 데이터의 흐름: 이 메서드는 사용자의 별도 요청(클릭) 없이 스프링이 스스로 백그라운드에서 주기적으로 호출하여 처리합니다.
        System.out.println("[스케줄러 동작] 현재 서버 시간: " + LocalDateTime.now());
    }
}

