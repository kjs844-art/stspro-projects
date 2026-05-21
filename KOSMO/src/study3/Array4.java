package study3;

public class Array4 {

	public static void main(String[] args) {
		for(int i=0;i<numbers.length;i++) {
			System.out.println(numbers[i]);
		}
		// 0, 1
		// 1, 2
		// 2, 3

		for(int i=0;i<numbers.length-1;i++) {
		    for(int j = i + 1; j < numbers.length; j++) {
		        if(numbers[i] > numbers[j]) {
		            int t = numbers[i];
		            numbers[j] = numbers[j];
		            numbers[j] = t;
		        }
		    }
		}

		int sum = 0;
		for(int i=1;i<1001;i++) {
			if(i%3==0) {
				sum=sum+1;
				
			}
		}
	}

}
