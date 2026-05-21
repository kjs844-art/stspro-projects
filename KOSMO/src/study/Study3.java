package study;

import java.util.Scanner;

public class Study3 {

	public static void main(String [] args) {
		System.out.println("Start");
		Scanner sc = new Scanner(System.in);
		//변수 선언 sc까지 
		
		System.out.println("이름을 입력하세요");
		
		String name = sc.next();
		
		System.out.println("나이를 입력하세요");
		int age = sc.nextInt();
		
		System.out.println(name);
		
		System.out.println(age);
		
		System.out.println("Finish");
	}
	
}
