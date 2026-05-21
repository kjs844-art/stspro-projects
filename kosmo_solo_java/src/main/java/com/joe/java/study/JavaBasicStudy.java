package com.joe.java.study;

import java.util.ArrayList;
import java.util.List;

// 이 파일은 kosmo163_java의 Main 예제들을 Spring 프로젝트 안에서 복습하기 쉽게 정리한 학습용 파일입니다.
// 실제 웹 URL과 연결되는 Controller가 아니므로 서버 동작에는 영향을 주지 않습니다.
// 목적: 클래스, 객체, 변수, 메서드, String 비교, List, 배열, 예외처리를 한 파일에서 천천히 복습하기.
public class JavaBasicStudy {

	public static void main(String[] args) {
		// main 메서드는 Java 프로그램을 단독 실행할 때 시작점입니다.
		// Spring Boot 서버는 KosmoJoeJavaApplication의 main에서 시작하고,
		// 이 파일은 자바 기초 복습용으로 따로 실행해볼 수 있습니다.
		objectStudy();
		stringStudy();
		listStudy();
		arrayAndDtoStudy();
		exceptionStudy();
	}

	public static void objectStudy() {
		// 모든 클래스의 가장 위쪽 부모는 Object입니다.
		// 그래서 String도 Object 타입 변수에 담을 수 있습니다.
		String name = "winter";
		Object obj = name;

		// 변수 선언 공식: 데이터타입 + 변수명 = 값;
		// Object obj = name; 에서 Object는 데이터 타입, obj는 변수명, name은 오른쪽 값입니다.
		System.out.println(obj);
	}

	public static void stringStudy() {
		String name = "winter";
		String name2 = "Winter";

		// charAt(3)은 문자열에서 3번 위치의 글자 하나를 꺼내는 메서드입니다.
		// index는 0부터 시작합니다. winter에서 0=w, 1=i, 2=n, 3=t 입니다.
		char ch = name.charAt(3);
		System.out.println(ch);

		// 문자열 비교는 ==보다 equals를 우선으로 기억하면 안전합니다.
		// == 는 같은 객체인지 보는 느낌이고, equals는 글자 내용이 같은지 보는 느낌입니다.
		boolean same = name.equals(name2);
		System.out.println(same);

		// equalsIgnoreCase는 대문자/소문자 차이를 무시하고 비교합니다.
		boolean sameIgnoreCase = name.equalsIgnoreCase(name2);
		System.out.println(sameIgnoreCase);
	}

	public static void listStudy() {
		// 배열은 크기가 고정입니다.
		int[] numbers = new int[2];
		numbers[0] = 10;
		numbers[1] = 20;

		// List는 크기가 유동적으로 늘어날 수 있는 자료구조입니다.
		// 제네릭 <String>을 붙이면 "문자열만 담는 List"라는 뜻입니다.
		List<String> names = new ArrayList<>();
		names.add("winter");
		names.add("spring");

		// for문은 반복할 때 사용합니다.
		// i는 반복 횟수를 세는 지역변수입니다.
		for (int i = 0; i < names.size(); i++) {
			System.out.println(names.get(i));
		}

		// clear()는 List 안의 값을 전부 비웁니다.
		names.clear();
		System.out.println(names.size());
	}

	public static void arrayAndDtoStudy() {
		// DTO는 데이터를 담는 상자 역할을 하는 클래스입니다.
		// StudentDTO도 직접 만든 클래스이므로 데이터 타입으로 사용할 수 있습니다.
		StudentDTO student = new StudentDTO("홍길동", 20);
		System.out.println(student.name);
		System.out.println(student.age);

		// 클래스 배열도 만들 수 있습니다.
		StudentDTO[] students = new StudentDTO[2];
		students[0] = new StudentDTO("김학생", 21);
		students[1] = new StudentDTO("이학생", 22);

		for (int i = 0; i < students.length; i++) {
			System.out.println(students[i].name);
		}
	}

	public static void exceptionStudy() {
		int a = 10;
		int b = 0;

		try {
			// 0으로 나누면 ArithmeticException이 발생합니다.
			int c = a / b;
			System.out.println(c);
		} catch (ArithmeticException e) {
			// 문제가 생겼을 때 프로그램이 바로 죽지 않게 잡는 부분입니다.
			System.out.println("0으로 나눌 수 없습니다.");
		} finally {
			// finally는 예외가 나든 안 나든 마지막에 실행됩니다.
			System.out.println("예외 처리 연습 종료");
		}
	}

	// 내부 클래스입니다. 한 파일 안에서만 간단히 DTO 개념을 보여주기 위해 넣었습니다.
	// 실제 프로젝트에서는 보통 StudentDTO.java처럼 파일을 따로 분리합니다.
	static class StudentDTO {
		// 클래스 안, 메서드 밖에 선언했으므로 멤버변수입니다.
		String name;
		int age;

		// 생성자입니다. new StudentDTO("홍길동", 20) 할 때 딱 1번 호출됩니다.
		StudentDTO(String name, int age) {
			// this.name은 멤버변수, 오른쪽 name은 생성자 매개변수입니다.
			this.name = name;
			this.age = age;
		}
	}
}