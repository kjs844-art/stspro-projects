package study2;

import java.util.Scanner;

public class Condition4_1 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("입력하세요");
		String name=sc.next();
		//reference type은 == 안됨
		if(name == "q") {
			System.out.println("q");
		}else if(name=="w") {
			System.out.println("w");
		}else {
			System.out.println("모르겠다");
			
		}
		
		String v = "w";
		
		switch(name) {
		case "q":
			System.out.println("q");
			break;
		case "w":
			System.out.println("w");
			break;
		default :
			System.out.println("모르겠다");
			
		}
		// TODO Auto-generated method stub

	}

}
