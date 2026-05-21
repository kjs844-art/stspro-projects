package study2;

import java.util.Scanner;

public class Condition8_while_ex1 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		//1.로그인, 2.회원가입, 3.프로그램종료
		//MMORPG
		//모든 몬스터의 경험치는 동일
		//1 -> 2 : 3
		//2 -> 3 : 6
		//3 -> 4 : 9
		//4 -> 5 : 12
		//...
		//10 -> 11 : 30
		//gold : 0
		//5랩 달성시 : 1000 지급
		//10 달성시 : 2000 지급
		//15 달성시 : 3000지급
		//20랩 달성시 : 4000 지급
		// ....
		//30랩 달성시 : 6000지급
		// 게임 종료 후 현재 랩하고 골드를 출력
		int level=1;//레벨
		int gold=0;
		boolean flag=true;
		while(flag) {
			System.out.println("1. 사냥 2. 게임종료");
			int select = sc.nextInt();
			if(select==1) {
				for(int i=0;i<level*3;i++) {
					System.out.print(i+1+" 마리 사냥 성공");
				}
				System.out.println("축 레벨업 !!");
				level++;
				if(level%5==0) {
					gold = gold + level/5*1000;
					System.out.println(level/5*1000 + " gold 지급");
				}
			}else {
				break;
			}
				
		System.out.println("현재 레벨 : "+level+" 현재골드 : "+gold);
			}
			
		}
	}


