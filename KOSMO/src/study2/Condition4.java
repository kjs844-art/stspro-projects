package study2;

public class Condition4 {

	public static void main(String[] args) {
		int select = 2;
		if(select==1) {
			System.out.println(1);
		}else if(select==2) {
			System.out.println(2);
		}else {
			System.out.println("그외 나머지");
		}
			
		


		//------------------------------
		//조건식은 결과값이 boolean(true, false)
		//정수식은 결과값이 정수

		switch(select) {
		case 1*20 :
			System.out.println("1");
			break;
		case 2 : 
			System.out.println("2");
			break;
		default :
			System.out.println("그외 나머지");
		}
		
			
	  }
	}

