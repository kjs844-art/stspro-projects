package study2;

import java.util.Scanner;

public class Condition6_for {
	

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
	//은행에서 로그인 진행
		//1.로그인 2. 종료
		//1번이면 ID, PW을 입력받음
		//2번이면 그대로 종료
		//ID, PW을 입력받음
		// 최대 5번까지 로그인 시도 가능
		int id =1234;//가입한 ID
		int pw=5678;//가입한 PW
		boolean flag=false;
		for (int i = 0; i< 5; i++) {
			System.out.println("1.로그인 2.종료");
			int select=sc.nextInt();
			if(select==1) {
				System.out.println("id 입력");
				int yId = sc.nextInt();
				System.out.println("pw 입력");
				int yPw=sc.nextInt();
				if(yId == id && yPw == pw) {
					i=500;
					//flag=true;
					flag = !flag;
				}
			}else {
				i=999;
						
			}
			//for 의 끝
		if(flag) {
			System.out.println("로그인 성공");
		}else {
			System.out.println("은행 방문");
	
		}
		}
		
		
	}
}

	
	
