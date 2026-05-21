package study2;

import java.util.Scanner;

public class Condition8_while {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		boolean flag=true;
		
		while(flag)	{
			System.out.println("hello");	
			System.out.println("1. 진행, 2. 종료");
			int select=sc.nextInt();
			if(select==2) {
				flag=false;
				break;
			}
		
		}
		
//		do{
//			
//			
//		}while(flag);
		

	}

}
