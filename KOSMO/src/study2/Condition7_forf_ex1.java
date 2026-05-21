package study2;

import java.util.Scanner;

public class Condition7_forf_ex1 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		//탄창 1개에 30발 
		//총 탄창이 3개 소지
		//1. 단발, 2. 점사
		//1. 탕, 2. 타타탕
		for(int i=0;i<3;i++); {
			System.out.println("1. 단발 2. 점사");
			int select=sc.nextInt();
			int count=3;
			String sound="타타탕";
			if(select==1) {
				 count=1;
				 sound="탕";
				 
			}
				
				for(int t=0;t<30;t=t+count) {
					System.out.println(sound);
			}	
		
		}

		}
	}

