package study2;

public class Condition3_ex1 {

	public static void main(String[] args) {
		// 국어, 영어, 수학 점수를 입력 받고
		//총점과 평균을 계산
		// 평균이 90점 이상이면 A를 춮력
		// 평균이 80점 이상이면 B를 출력
		// 평균이 70점 이상이면 C를 출력
		// 평균이 60점 이상이면 D를 출력
		// 그외 나머지는 F를 출력
		int kor = 80;
		int eng = 75;
		int math = 69;
		int total = kor + eng + math;
		int avg = total/3;
		if(avg>=90) {
			System.out.println("A");
		}else if(avg>=80) {
			System.out.println("B");
		}else if(avg>=70) {
			System.out.println("C");
		}else if(avg>=60) {
			System.out.println("D");
		}else {
			System.out.println("F");
			
				
			}
			}
		
	}


