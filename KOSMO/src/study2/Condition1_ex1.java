package study2;

import java.util.Scanner;

public class Condition1_ex1 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		//물건값을 담을 변수 
		int money = 12000;
		
		System.out.println("1. 알뜰배달");
		System.out.println("2. 한집배달");
		int select = sc.nextInt();
		int b = 0;
		
		//1번을 선택했다면 배달료 2000을 출력
		//2번을 선택했다면 배달료 4000을 출력
		if(select ==1) {
			b=2000;
		
		}
		if(select ==2) {
			b=4000;
		}
		money = money+b;
		System.out.println(money);
		

	}

}
