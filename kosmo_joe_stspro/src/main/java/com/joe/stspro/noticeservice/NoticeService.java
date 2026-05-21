package com.joe.stspro.noticeservice; // 생성순서 (4) NoticeService.java: DTO에 실제 Java 데이터를 넣고 Controller로 돌려주는 클래스를 만듭니다.

import java.util.ArrayList; // 흐름 5-2: ArrayList는 여러 NoticeDTO를 실제로 담는 목록 클래스 타입입니다.

import java.util.List; // 흐름 5-3: List는 여러 NoticeDTO를 담겠다는 목록 인터페이스 타입입니다.

import org.springframework.stereotype.Service; // 흐름 5-4: @Service 어노테이션 타입을 가져옵니다.

@Service // 흐름 5-5: Spring에게 NoticeService 객체를 미리 만들어 Controller에 넣어줄 수 있게 하라는 뜻입니다.

public class NoticeService { // 흐름 5-6: NoticeService는 Controller가 요청한 notice 데이터를 실제로 만드는 클래스입니다.

	public List<NoticeDTO> list() { // 흐름 5-7: list()는 NoticeDTO 여러 개를 List<NoticeDTO> 타입으로 돌려주는 메서드입니다.

		NoticeDTO dto = new NoticeDTO(); // 흐름 5-8: NoticeDTO 타입의 dto 상자를 새로 만들어 첫 번째 데이터를 담을 준비를 합니다.

		dto.setVariable("DTO"); // 흐름 5-9: dto의 variable 칸에 "DTO" 문자열 데이터를 넣습니다.

		NoticeDTO dab = new NoticeDTO(); // 흐름 5-10: NoticeDTO 타입의 dab 상자를 새로 만들어 두 번째 데이터를 담을 준비를 합니다.

		dab.setVariable("DAB"); // 흐름 5-11: dab의 variable 칸에 "DAB" 문자열 데이터를 넣습니다.

		dab.setNumber(null); // 흐름 5-12: dab의 number 칸에 null을 넣으며, Integer 타입이라 null 저장이 가능합니다.

		List<NoticeDTO> dat = new ArrayList<>(); // 흐름 5-13: List<NoticeDTO> 타입의 dat 목록을 만들어 DTO 여러 개를 담을 가방을 준비합니다.

		dat.add(dto); // 흐름 5-14: dat 목록에 첫 번째 DTO 데이터 dto를 넣습니다.

		dat.add(dab); // 흐름 5-15: dat 목록에 두 번째 DTO 데이터 dab을 넣습니다.

		return dat; // 흐름 5-16: 완성된 List<NoticeDTO> 목록 dat을 NoticeController로 돌려줍니다.

	} // 흐름 5-17: list() 메서드 영역을 닫습니다.

	public NoticeDTO detail() { // 흐름 5-18: detail()은 NoticeDTO 하나만 만들어 상세 화면용으로 돌려주는 메서드입니다.

		NoticeDTO dto = new NoticeDTO(); // 흐름 5-19: 상세 화면에 보낼 NoticeDTO 타입의 dto 상자를 새로 만듭니다.

		dto.setVariable("DTODTODTO"); // 흐름 5-20: dto의 variable 칸에 상세 화면용 문자열 데이터를 넣습니다.

		return dto; // 흐름 5-21: 완성된 NoticeDTO 하나를 NoticeController의 detail() 메서드로 돌려줍니다.

	} // 흐름 5-22: detail() 메서드 영역을 닫습니다.

} // 흐름 5-23: NoticeService 클래스 영역을 닫습니다.
