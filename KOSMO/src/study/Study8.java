package study;

public class Study8 {
	public static void main(String[] args) {
		
		//물건값의 총합계를 담을 변수를 선언
		//총합계가 40000원 이상이면 배달료 2000추가
		//아니면 배달로 4000이 추가
		//총금액을 출력
		int money = 30000;
		//money = money >= 40000?money+2000:money+4000;
		//money=money+b;
		
		int total = money>=40000?money+2000:money+4000;
		
		System.out.println(total);
		
		
	}
}
