package study2;

import java.util.Scanner;

public class Condition7_for {

	public static void main(String[] args) {
		
//		for(int dan=2;dan<10;dan++) {
//			for(int i=1;i<10;i++) {
//				System.out.println(dan+"*"+i+"="+dan*i);
//			
//		 }
//		
//	   }
//
//    }
//}
	 Scanner sc = new Scanner(System.in);
	 System.out.println("분을 입력");
	 int b = sc.nextInt();
	 
	 System.out.println("초를 입력");
	 int c = sc.nextInt();//30
	 
	 //0분 0초 59분 59초 출력 이중 for문
	 // 바깥쪽 for문 : "분" 제어 (0~59)
	 boolean flag=false;//f=>분이 맞지 않은 상황, t=> 분은 일치
	 boolean check=false;
	 for (int minute = 0; minute < 60; minute++) {
		 
		 
		 // 안쪽 for문 : "초" 제어 (0~59)
		 for (int second = 0; second < 60; second++) {
			 //출력 양식 설정 (예: 0분 0초)
			 System.out.println(minute + "분" + second + "초");
			 if(minute==b && second==c)	{
				 //check=true;
				 minute=60;
				 break;
			 } 
		 }//안쪽 for 끝
		 
	}//바깥 for 끝
	 
	 System.out.println("프로그램 종료"); 
	 	
	 
	 
	}
}
	


