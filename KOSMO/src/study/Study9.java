package study;

public class Study9 {
	
	private static String bak;
	private static String chon;
	private static String man;

	public	static void main(String[] args) {
		//무인 편의점
		//총 가격 
		int total=32500;
		//손님이 낸돈 
		int pay=50000;
		
		int jandon = pay - total;
		
		System.out.println(jandon);
			//87500, 45300
		
//		int man=jandon/10000;
//		int chon=jandon/1000 - man*10;
//		int bak=jandon/100 -man*100 - chon*10;
		
		
//		int man=jandon/10000;
//		int chon=jandon/1000%10;
//		int bak=jandon/100%10;
		
		//45300
//		int man=jandon/10000;
//		jandon = jandon%10000;
//		int chon= jandon/1000;
//		jandon = jandon%1000;
//		int bak=jandon%100;
		//man=1, chon=7, bak=5
		
		System.out.println("만원 : "+man+"장");
		System.out.println("천원 : "+chon+"장");
		System.out.println("백원 : "+bak+"개");
		//변수 타입 선언
		
		
		
		int man=0;
		man=jandon/10000;
		int chon=jandon%10000/1000;
		int bak=jandon%1000/100;
		
		
		
		//산술연산자 
		
	}
	
}
