package com.joe.sq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
    org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class,
    org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration.class
})
public class KosmoProSqApplication {

	public static void main(String[] args) {
		SpringApplication.run(KosmoProSqApplication.class, args);
	}

}
