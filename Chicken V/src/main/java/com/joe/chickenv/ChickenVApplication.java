package com.joe.chickenv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ChickenVApplication extends SpringBootServletInitializer {
    // War 패키징을 위해 SpringBootServletInitializer를 상속받습니다.

    public static void main(String[] args) {
        SpringApplication.run(ChickenVApplication.class, args);
    }

}
