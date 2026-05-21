package com.joe.stspro; // 흐름 1-1: 이 파일이 com/joe/stspro 기본 패키지 소속이라는 뜻입니다.

import org.springframework.boot.SpringApplication; // 흐름 1-2: Spring Boot 서버를 실행하는 SpringApplication 타입을 가져옵니다.

import org.springframework.boot.autoconfigure.SpringBootApplication; // 흐름 1-3: 이 클래스를 Spring Boot 시작점으로 표시하는 어노테이션 타입입니다.

@SpringBootApplication // 흐름 1-4: Spring Boot가 이 클래스부터 설정, Controller, Service를 읽기 시작합니다.

public class KosmoJoeStsproApplication { // 흐름 1-5: 프로젝트의 시작 클래스이며, class 오른쪽 이름이 직접 만든 데이터 타입입니다.

	public static void main(String[] args) { // 흐름 1-6: Java 프로그램 시작 메서드이고, String[] args는 실행 옵션을 담는 매개변수입니다.

		SpringApplication.run(KosmoJoeStsproApplication.class, args); // 흐름 1-7: run() 메서드가 서버를 켜고 Controller들이 URL을 받을 준비를 합니다.

	} // 흐름 1-8: main() 메서드 영역을 닫습니다.

} // 흐름 1-9: KosmoJoeStsproApplication 클래스 영역을 닫습니다.
