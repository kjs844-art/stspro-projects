package study2;

public class Condition4_ex1 {

	public static void main(String[] args) {
		//국어, 영어, 수학
		//총점, 평균 계산
		// 평균이 90점 이상이면 A
		// 평균이 80점 이상이면 B
		// 평균이 79점 이상이면 C
		// 그외 나머지 F
		// switch 로 구현
		int kor=85;
		int eng = 78;
		int math = 68;
		int total = kor+eng+math;
		int avg = total/3;
		
		switch(avg/10) {
		case 9:
			System.out.println("A");
			break;
		case 8:
			System.out.println("B");
			break;
		case 7:
			System.out.println("C");
			break;
		default:
			System.out.println("F");
			
			
		}
	}

}
