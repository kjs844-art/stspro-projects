package com.joe.stspro.noticeservice; // 생성순서 (3) NoticeDTO.java: JSP로 보낼 variable, number 데이터를 담는 상자 클래스를 만듭니다.

import lombok.Getter; // 흐름 4-2: private 변수 값을 읽는 getter 메서드를 자동 생성하는 Lombok 타입입니다.

import lombok.Setter; // 흐름 4-3: private 변수 값을 넣는 setter 메서드를 자동 생성하는 Lombok 타입입니다.

@Getter // 흐름 4-4: JSP 출력 때 필요한 getVariable(), getNumber() 메서드를 자동으로 만들어 줍니다.

@Setter // 흐름 4-5: Service에서 값을 넣을 때 필요한 setVariable(), setNumber() 메서드를 자동으로 만들어 줍니다.

public class NoticeDTO { // 흐름 4-6: NoticeDTO는 notice 데이터를 담아서 Controller와 JSP 사이로 이동시키는 상자 클래스입니다.

	private String variable; // 흐름 4-7: String은 문자열 데이터 타입이고, variable은 JSP에 출력할 문자 데이터를 담는 멤버변수입니다.

	private Integer number; // 흐름 4-8: Integer는 null도 가능한 정수 데이터 타입이고, number는 숫자 데이터를 담는 멤버변수입니다.

} // 흐름 4-9: NoticeDTO 클래스 영역을 닫습니다.
