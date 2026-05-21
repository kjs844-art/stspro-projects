package com.example.joe.noticeservice;

import lombok.Getter;
import lombok.Setter;

/*
 * [DTO 역할]
 * DTO = 여러 데이터를 하나로 묶어서 이동시키는 상자
 * Java 데이터 -> DTO에 모음 -> Model에 담음 -> JSP에서 출력
 *
 * [공식]
 * 멤버변수 = 접근지정자 + 데이터타입 + 변수명
 * private String variable = 문자열 데이터를 담는 멤버변수
 * private Integer number = 숫자 데이터를 담는 멤버변수
 */
@Getter // getter 생성: dto.getVariable(), dto.getNumber()
@Setter // setter 생성: dto.setVariable(...), dto.setNumber(...)
public class NoticeDTO {
	
	private String variable;
	
	// kosmo_java_main의 Int 에러를 수정한 버전입니다.
	// Java 정수 타입은 int 또는 Integer를 사용합니다.
	private Integer number;
	
}