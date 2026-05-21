package study3;

public class Array5 {
	
	public static void name(String[] args) {
		int [] n1 = {1,2,3};
		
		int [] n2 = new int [3];
		
		
		int [] n3 = n1;//얕은 복사 
		
		//깊은 복사 
		for(int i=0;i<n1.length;i++)
			n2[i]=n1[i];
		
		System.out.println(n1[0]);
		System.out.println(n3[0]);
		
		
		
		//S V O - 영어와 같은 문법 형식
		//ArrayList<Integer> ar;
		
		//BufferedReader br=?;
		
		
	}

}
