package study2;

import java.util.Scanner;

public class Condition5_for {

	public static void main(String[] args) {
		
		for(int i=0;i<5;i++) {//i=i+1
			System.out.println("hello");
			System.out.println(i);
		
			
		}
		System.out.println("5부터 출력");
		for(int i=5;i>0;i--) {
			System.out.println(i);
		}
		System.out.println("0부터 10미만까지 짝수만 출력");
		System.out.println("짝수의 갯수를 출력");
		int count=0;
		for(int i=0;i<10;i++) {
			if(i%2==0) {
				System.out.println(i);
				//count=count+1;
				count++;
				
			}
		}
		System.out.println("짝수의 갯수 : "+count);
		
		for(int i=0;i<10;i=i+2) {
			System.out.println(i);
		}
		Scanner sc = new Scanner(System.in);
		System.out.println("종료할 초를 입력하세요");
		int sec = sc.nextInt();
		
	}

}
