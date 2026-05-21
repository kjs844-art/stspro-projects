# NoticeService.java 한 줄씩 해설

작성일: 2026-05-14  
기준 프로젝트: `kosmo_solo_java`  
기준 파일:

```text
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_solo_java\src\main\java\com\joe\java\notice\NoticeService.java
```

관련해서 같이 본 파일:

```text
NoticeDTO.java
Test.java
NoticeController.java
```

목표:

```text
NoticeService.java를 위에서 아래로 읽으면서
무엇이 클래스인지,
무엇이 데이터 타입인지,
무엇이 변수인지,
무엇이 메서드인지,
무엇이 객체 생성인지
한 줄씩 구분한다.
```

---

## 0. 먼저 전체 그림

`NoticeService`는 Controller가 요청한 실제 작업을 처리하는 클래스다.

현재 흐름은 이렇게 보면 된다.

```text
브라우저
-> NoticeController
-> NoticeService
-> NoticeDTO
-> NoticeController
-> JSP
```

`NoticeService.java`에서 가장 중요한 줄은 이 흐름이다.

```java
NoticeDTO dto = new NoticeDTO();
dto.setVariable("DTO");
dto.setNumber(1);
return dto;
```

쉽게 말하면:

```text
NoticeDTO 상자를 만들고,
그 상자에 문자와 숫자를 넣고,
Controller에게 돌려준다.
```

---

## 1. 코드 원본

```java
package com.joe.java.notice;

import org.springframework.stereotype.Service;

// Service 클래스는 Controller가 요청한 실제 작업을 처리하는 곳입니다.
// Controller가 손님 주문을 받는 직원이라면, Service는 주방에서 실제 일을 하는 역할입니다.
@Service // Spring에게 "이 클래스의 객체를 미리 만들어 관리해 주세요"라고 알려줍니다.
public class NoticeService { // 클래스 선언: public + class + NoticeService + { }
	
	// 메서드 선언 공식: 접근지정자 + 그 외 지정자 + 반환타입 + 메서드명 + () + { }
	// public NoticeDTO list() 에서 NoticeDTO는 반환타입입니다.
	// 즉, 이 메서드는 실행 후 NoticeDTO 객체를 돌려준다는 뜻입니다.
	public NoticeDTO list() { // 메서드 영역 시작: 이 안에 선언하는 변수는 지역변수입니다.				
		// 객체 생성 공식: 클래스명 변수명 = new 생성자명();
		// NoticeDTO dto = new NoticeDTO(); 에서 NoticeDTO는 데이터 타입, dto는 변수명입니다.
		// new NoticeDTO()는 NoticeDTO 생성자를 호출해서 객체를 실제로 만드는 코드입니다.
		NoticeDTO dto = new NoticeDTO();
		
		// setVariable(...)은 Lombok의 @Setter가 만들어주는 메서드입니다.
		// dto 객체 안의 variable 멤버변수에 "DTO"라는 문자열을 넣습니다.
		dto.setVariable("DTO");
		
		// setNumber(...)도 @Setter가 만들어주는 메서드입니다.
		// Java 정수 타입은 Int가 아니라 int 또는 Integer입니다.
		dto.setNumber(1);
		
		// 지역변수 선언 공식: 데이터 타입 + 공백 + 변수명 = 값;
		// int는 정수 데이터 타입이고, old는 변수명입니다.
		// = 는 대입 연산자입니다. 오른쪽 30을 왼쪽 old 변수에 넣습니다.
		int old = 30;
		
		// 클래스 또한 데이터 타입입니다.
		// Test age; 에서 Test는 직접 만든 클래스명이면서 데이터 타입이고, age는 변수명입니다.
		// 아직 new Test()를 하지 않았으므로 객체가 실제로 만들어진 상태는 아닙니다.
		Test age;
		
		// 객체까지 만들고 싶다면 아래처럼 작성합니다.
		// Test age2 = new Test();
		// new 다음 Test()는 생성자 호출입니다. 생성자는 객체를 만들 때 딱 1번 호출됩니다.
		
		// System.out.println 뒤에 ()가 있으므로 메서드 호출입니다.
		// 콘솔 창에 문자를 출력해서 코드가 실행됐는지 확인할 때 자주 사용합니다.
		System.out.println("nothing");
		
		// return을 만나면 메서드는 즉시 종료되고, 오른쪽 값을 호출한 곳으로 돌려줍니다.
		// 여기서는 NoticeController로 dto 객체를 돌려줍니다.
		return dto;
		
	} // 메서드 영역 끝								

} // 클래스 영역 끝
```

---

## 2. 한 줄씩 해설

### 1번째 줄

```java
package com.joe.java.notice;
```

이 줄은 **패키지 선언**이다.

패키지는 Java 파일이 들어있는 폴더 주소 같은 것이다.

```text
com.joe.java.notice
```

이 패키지 안에 있는 클래스들은 서로 같은 공간에 있다고 볼 수 있다.

그래서 `NoticeService.java`에서 `NoticeDTO`를 import하지 않아도 바로 사용할 수 있다.

이유:

```text
NoticeService.java와 NoticeDTO.java가 같은 패키지 com.joe.java.notice 안에 있기 때문
```

여기에는 데이터 타입이나 메서드 호출이 없다.

---

### 2번째 줄

```java

```

빈 줄이다.

코드 실행에는 영향이 없다.

사람이 읽기 좋게 구역을 나누는 역할이다.

---

### 3번째 줄

```java
import org.springframework.stereotype.Service;
```

이 줄은 **import 문**이다.

`@Service`를 사용하기 위해 필요한 Spring 클래스를 가져온다.

여기서 중요한 타입:

```text
Service
```

이 `Service`는 7번째 줄의 `@Service` 어노테이션을 말한다.

주의:

```text
NoticeService의 Service와
import한 Spring의 Service는 이름이 비슷하지만 역할이 다르다.
```

구분:

```text
org.springframework.stereotype.Service = Spring이 제공하는 어노테이션 타입
NoticeService = 내가 만든 클래스 이름
```

---

### 4번째 줄

```java

```

빈 줄이다.

실행에는 영향이 없다.

---

### 5번째 줄

```java
// Service 클래스는 Controller가 요청한 실제 작업을 처리하는 곳입니다.
```

주석이다.

주석은 사람이 읽는 설명이고, Java가 실행하지 않는다.

이 줄은 `NoticeService`의 역할을 설명한다.

핵심:

```text
Controller = 요청을 받는 입구
Service = 실제 작업을 처리하는 곳
```

---

### 6번째 줄

```java
// Controller가 손님 주문을 받는 직원이라면, Service는 주방에서 실제 일을 하는 역할입니다.
```

주석이다.

비유로 이해하면:

```text
Controller = 주문 받는 직원
Service = 음식을 만드는 주방
```

현재 파일 `NoticeService.java`는 주방 역할이다.

---

### 7번째 줄

```java
@Service // Spring에게 "이 클래스의 객체를 미리 만들어 관리해 주세요"라고 알려줍니다.
```

`@Service`는 **어노테이션**이다.

어노테이션은 Spring에게 알려주는 표시라고 보면 된다.

이 줄의 의미:

```text
Spring아, NoticeService 클래스를 Service 역할의 객체로 만들어서 관리해줘.
```

여기서 `Service` 타입은 3번째 줄에서 import한 이것을 말한다.

```java
import org.springframework.stereotype.Service;
```

즉:

```text
7번째 줄의 @Service
-> 3번째 줄에서 import한 Spring의 Service 어노테이션
```

주의:

```text
@Service는 메서드가 아니다.
뒤에 ()가 없고, @로 시작하는 Spring 표시다.
```

---

### 8번째 줄

```java
public class NoticeService { // 클래스 선언: public + class + NoticeService + { }
```

이 줄은 **클래스 선언**이다.

나누면:

```text
public        = 접근지정자
class         = 클래스를 만들겠다는 Java 키워드
NoticeService = 클래스 이름
{             = 클래스 영역 시작
```

`NoticeService`는 클래스 이름이면서, 나중에 데이터 타입처럼 사용할 수 있다.

예를 들어 `NoticeController.java`에는 이런 코드가 있다.

```java
private NoticeService output;
```

여기서:

```text
NoticeService = 데이터 타입
output = 변수명
```

즉:

```text
8번째 줄의 NoticeService 클래스는
NoticeController에서 NoticeService 타입으로 사용된다.
```

---

### 9번째 줄

```java
	
```

빈 줄이다.

클래스 내부에서 메서드 시작 전에 공간을 준 것이다.

---

### 10번째 줄

```java
// 메서드 선언 공식: 접근지정자 + 그 외 지정자 + 반환타입 + 메서드명 + () + { }
```

주석이다.

곧 나올 13번째 줄의 메서드 선언 공식을 설명한다.

메서드 선언 공식:

```text
접근지정자 + 반환타입 + 메서드명 + () + { }
```

예:

```java
public NoticeDTO list() {
```

---

### 11번째 줄

```java
// public NoticeDTO list() 에서 NoticeDTO는 반환타입입니다.
```

주석이다.

13번째 줄을 미리 설명한다.

핵심:

```text
NoticeDTO는 반환타입이다.
```

반환타입은 메서드가 끝날 때 `return`으로 돌려주는 값의 타입이다.

13번째 줄의 `NoticeDTO`는 `NoticeDTO.java` 파일의 이 클래스를 말한다.

```java
public class NoticeDTO {
```

즉:

```text
13번째 줄의 NoticeDTO
-> NoticeDTO.java에 있는 NoticeDTO 클래스 타입
```

---

### 12번째 줄

```java
// 즉, 이 메서드는 실행 후 NoticeDTO 객체를 돌려준다는 뜻입니다.
```

주석이다.

13번째 줄의 `public NoticeDTO list()`가 무슨 뜻인지 설명한다.

뜻:

```text
list() 메서드를 실행하면
마지막에 NoticeDTO 객체를 return해야 한다.
```

그래서 47번째 줄에 이런 코드가 있다.

```java
return dto;
```

여기서 `dto`는 17번째 줄에서 만든 `NoticeDTO` 타입 변수다.

---

### 13번째 줄

```java
public NoticeDTO list() { // 메서드 영역 시작: 이 안에 선언하는 변수는 지역변수입니다.
```

이 줄은 **메서드 선언**이다.

나누면:

```text
public    = 접근지정자
NoticeDTO = 반환타입
list      = 메서드명
()        = 매개변수가 없다는 뜻
{         = 메서드 영역 시작
```

여기서 `NoticeDTO`는 데이터 타입이다.

이 타입은 위에서 말한 `NoticeDTO.java`의 클래스다.

즉:

```text
13번째 줄의 NoticeDTO 타입
-> NoticeDTO.java의 public class NoticeDTO를 이야기한다.
```

`list()`는 메서드다.

왜 메서드인가?

```text
이름 뒤에 ()가 있기 때문
```

이 메서드는 `NoticeController.java`에서 호출된다.

```java
NoticeDTO dto = output.list();
```

즉:

```text
NoticeController의 output.list()
-> NoticeService의 list() 메서드를 실행한다.
```

---

### 14번째 줄

```java
// 객체 생성 공식: 클래스명 변수명 = new 생성자명();
```

주석이다.

17번째 줄의 객체 생성 공식을 설명한다.

공식:

```text
클래스명 변수명 = new 생성자명();
```

예:

```java
NoticeDTO dto = new NoticeDTO();
```

---

### 15번째 줄

```java
// NoticeDTO dto = new NoticeDTO(); 에서 NoticeDTO는 데이터 타입, dto는 변수명입니다.
```

주석이다.

17번째 줄을 미리 설명한다.

핵심:

```text
NoticeDTO = 데이터 타입
dto = 변수명
```

---

### 16번째 줄

```java
// new NoticeDTO()는 NoticeDTO 생성자를 호출해서 객체를 실제로 만드는 코드입니다.
```

주석이다.

17번째 줄의 오른쪽 부분을 설명한다.

```java
new NoticeDTO()
```

이 부분은 `NoticeDTO` 객체를 실제로 만든다.

여기서 `NoticeDTO()`는 생성자 호출이다.

생성자는 클래스 이름과 같다.

---

### 17번째 줄

```java
NoticeDTO dto = new NoticeDTO();
```

이 줄은 **객체 생성 + 지역변수 선언 + 대입**이다.

나누면:

```text
NoticeDTO     = 데이터 타입
dto           = 변수명
=             = 대입 연산자
new           = 객체 생성 키워드
NoticeDTO()   = 생성자 호출
;             = 문장 끝
```

여기서 `NoticeDTO` 타입은 `NoticeDTO.java`의 클래스를 말한다.

```text
17번째 줄 왼쪽 NoticeDTO
-> NoticeDTO.java의 NoticeDTO 클래스 타입
```

오른쪽 `NoticeDTO()`도 같은 클래스를 말한다.

```text
17번째 줄 오른쪽 NoticeDTO()
-> NoticeDTO 클래스의 생성자
```

`dto`는 지역변수다.

왜 지역변수인가?

```text
13번째 줄 list() 메서드의 { } 안에서 선언되었기 때문
```

이 줄을 쉽게 말하면:

```text
NoticeDTO 상자를 하나 새로 만들고,
그 상자를 dto라는 이름으로 부르겠다.
```

---

### 18번째 줄

```java
		
```

빈 줄이다.

17번째 줄의 객체 생성과 21번째 줄의 값 넣기를 구분해준다.

---

### 19번째 줄

```java
// setVariable(...)은 Lombok의 @Setter가 만들어주는 메서드입니다.
```

주석이다.

21번째 줄의 `setVariable(...)`을 설명한다.

`setVariable`은 `NoticeDTO.java`의 `variable` 멤버변수에 값을 넣기 위한 setter 메서드다.

`NoticeDTO.java`에는 이런 어노테이션이 있다.

```java
@Setter
```

그래서 Lombok이 자동으로 이런 메서드를 만들어준다고 생각하면 된다.

```java
public void setVariable(String variable) {
    this.variable = variable;
}
```

---

### 20번째 줄

```java
// dto 객체 안의 variable 멤버변수에 "DTO"라는 문자열을 넣습니다.
```

주석이다.

21번째 줄의 결과를 설명한다.

`variable`은 `NoticeDTO.java`에 있는 멤버변수다.

```java
private String variable;
```

즉:

```text
21번째 줄의 setVariable(...)
-> NoticeDTO.java의 variable 멤버변수에 값을 넣는 메서드
```

---

### 21번째 줄

```java
dto.setVariable("DTO");
```

이 줄은 **메서드 호출**이다.

나누면:

```text
dto          = 17번째 줄에서 만든 NoticeDTO 타입 변수
.            = dto 객체 안으로 들어간다는 뜻
setVariable  = 메서드명
("DTO")      = 메서드에 전달하는 값
;            = 문장 끝
```

`dto`는 변수다.

`setVariable(...)`은 메서드다.

왜 메서드인가?

```text
뒤에 ()가 있기 때문
```

`"DTO"`는 문자열 데이터다.

문자열 타입은 `String`이다.

이 `"DTO"` 값은 `NoticeDTO.java`의 아래 변수에 들어간다.

```java
private String variable;
```

즉:

```text
21번째 줄의 "DTO"
-> NoticeDTO 안의 String variable에 들어간다.
```

---

### 22번째 줄

```java
		
```

빈 줄이다.

문자 데이터 입력과 숫자 데이터 입력을 구분해준다.

---

### 23번째 줄

```java
// setNumber(...)도 @Setter가 만들어주는 메서드입니다.
```

주석이다.

25번째 줄의 `setNumber(...)`를 설명한다.

`setNumber`도 `NoticeDTO.java`의 `@Setter` 때문에 자동 생성되는 setter 메서드다.

---

### 24번째 줄

```java
// Java 정수 타입은 Int가 아니라 int 또는 Integer입니다.
```

주석이다.

정수 타입을 설명한다.

중요:

```text
Java에는 Int 타입이 없다.
기본 정수 타입은 int다.
객체 정수 타입은 Integer다.
```

현재 `NoticeDTO.java`는 이렇게 되어 있다.

```java
private int number;
```

그래서 25번째 줄에서 숫자 `1`을 넣을 수 있다.

---

### 25번째 줄

```java
dto.setNumber(1);
```

이 줄은 **메서드 호출**이다.

나누면:

```text
dto        = 17번째 줄에서 만든 NoticeDTO 타입 변수
.          = dto 객체 안으로 들어간다는 뜻
setNumber  = 메서드명
(1)        = 메서드에 전달하는 숫자 값
;          = 문장 끝
```

`setNumber(...)`는 메서드다.

`1`은 정수 데이터다.

이 값은 `NoticeDTO.java`의 아래 변수에 들어간다.

```java
private int number;
```

즉:

```text
25번째 줄의 1
-> NoticeDTO 안의 int number에 들어간다.
```

---

### 26번째 줄

```java
		
```

빈 줄이다.

DTO에 값을 넣는 부분과 일반 지역변수 연습 부분을 구분해준다.

---

### 27번째 줄

```java
// 지역변수 선언 공식: 데이터 타입 + 공백 + 변수명 = 값;
```

주석이다.

30번째 줄의 지역변수 선언 공식을 설명한다.

공식:

```text
데이터타입 변수명 = 값;
```

예:

```java
int old = 30;
```

---

### 28번째 줄

```java
// int는 정수 데이터 타입이고, old는 변수명입니다.
```

주석이다.

30번째 줄을 미리 설명한다.

핵심:

```text
int = 정수 데이터 타입
old = 변수명
```

---

### 29번째 줄

```java
// = 는 대입 연산자입니다. 오른쪽 30을 왼쪽 old 변수에 넣습니다.
```

주석이다.

30번째 줄의 `=`를 설명한다.

대입 연산자:

```text
오른쪽 값을 왼쪽 변수에 넣는다.
```

---

### 30번째 줄

```java
int old = 30;
```

이 줄은 **지역변수 선언 + 대입**이다.

나누면:

```text
int = 데이터 타입
old = 변수명
=   = 대입 연산자
30  = 정수 값
;   = 문장 끝
```

`int`는 Java 기본 자료형이다.

`old`는 지역변수다.

왜 지역변수인가?

```text
13번째 줄 list() 메서드 안에서 선언되었기 때문
```

이 변수는 현재 JSP로 보내지지 않는다.

왜?

```text
return dto;로 dto만 돌려주고,
old는 dto 안에 넣지도 않았고 return하지도 않았기 때문
```

---

### 31번째 줄

```java
		
```

빈 줄이다.

정수 변수 연습과 클래스 타입 변수 연습을 구분해준다.

---

### 32번째 줄

```java
// 클래스 또한 데이터 타입입니다.
```

주석이다.

35번째 줄의 `Test age;`를 설명한다.

핵심:

```text
내가 만든 class도 데이터 타입처럼 사용할 수 있다.
```

예:

```java
Test age;
NoticeDTO dto;
NoticeService output;
```

---

### 33번째 줄

```java
// Test age; 에서 Test는 직접 만든 클래스명이면서 데이터 타입이고, age는 변수명입니다.
```

주석이다.

35번째 줄을 미리 설명한다.

`Test`는 `Test.java` 파일의 클래스다.

```java
public class Test {
```

즉:

```text
35번째 줄의 Test 타입
-> Test.java에 있는 Test 클래스를 이야기한다.
```

---

### 34번째 줄

```java
// 아직 new Test()를 하지 않았으므로 객체가 실제로 만들어진 상태는 아닙니다.
```

주석이다.

35번째 줄의 중요한 주의점이다.

```java
Test age;
```

이 코드는 변수 선언만 한 것이다.

객체 생성은 아직 안 했다.

객체까지 만들려면:

```java
Test age = new Test();
```

라고 해야 한다.

---

### 35번째 줄

```java
Test age;
```

이 줄은 **지역변수 선언**이다.

나누면:

```text
Test = 데이터 타입
age  = 변수명
;    = 문장 끝
```

`Test`는 직접 만든 클래스 타입이다.

이 타입은 `Test.java`의 클래스를 말한다.

```text
35번째 줄의 Test
-> Test.java의 public class Test
```

`age`는 지역변수다.

왜 지역변수인가?

```text
13번째 줄 list() 메서드 안에서 선언되었기 때문
```

주의:

```text
Test age;는 객체를 만든 것이 아니다.
Test 타입 변수를 선언한 것이다.
```

객체 생성까지 하려면:

```java
Test age = new Test();
```

라고 해야 한다.

---

### 36번째 줄

```java
		
```

빈 줄이다.

---

### 37번째 줄

```java
// 객체까지 만들고 싶다면 아래처럼 작성합니다.
```

주석이다.

38번째 줄의 예시를 설명한다.

---

### 38번째 줄

```java
// Test age2 = new Test();
```

주석 처리된 예시 코드다.

실행되지는 않는다.

하지만 구조는 중요하다.

나누면:

```text
Test    = 데이터 타입
age2    = 변수명
=       = 대입 연산자
new     = 객체 생성 키워드
Test()  = 생성자 호출
```

여기서 `Test()`는 `Test.java` 안의 생성자를 말한다.

`Test.java`에는 이런 생성자가 있다.

```java
public Test() {
}
```

즉:

```text
38번째 줄의 Test()
-> Test.java의 public Test() 생성자
```

---

### 39번째 줄

```java
// new 다음 Test()는 생성자 호출입니다. 생성자는 객체를 만들 때 딱 1번 호출됩니다.
```

주석이다.

38번째 줄의 `new Test()`를 설명한다.

핵심:

```text
new = 객체를 실제로 만든다.
Test() = 생성자를 호출한다.
```

생성자는 일반 메서드와 비슷하게 `()`가 있지만, 반환타입이 없다.

---

### 40번째 줄

```java
		
```

빈 줄이다.

---

### 41번째 줄

```java
// System.out.println 뒤에 ()가 있으므로 메서드 호출입니다.
```

주석이다.

43번째 줄의 `System.out.println("nothing");`을 설명한다.

중요한 구분법:

```text
뒤에 ()가 있으면 메서드 호출이다.
```

---

### 42번째 줄

```java
// 콘솔 창에 문자를 출력해서 코드가 실행됐는지 확인할 때 자주 사용합니다.
```

주석이다.

43번째 줄의 역할을 설명한다.

`System.out.println`은 콘솔에 글자를 출력한다.

---

### 43번째 줄

```java
System.out.println("nothing");
```

이 줄은 **메서드 호출**이다.

나누면:

```text
System      = Java에서 제공하는 클래스
out         = System 클래스 안의 출력 객체
println     = 출력 메서드
("nothing") = 출력할 문자열 값
;           = 문장 끝
```

`println(...)`은 메서드다.

왜 메서드인가?

```text
뒤에 ()가 있기 때문
```

`"nothing"`은 문자열 데이터다.

문자열 타입은 `String`이다.

이 줄은 JSP에 출력하는 것이 아니다.

출력 위치:

```text
STS/Eclipse Console 창
```

---

### 44번째 줄

```java
		
```

빈 줄이다.

콘솔 출력과 return을 구분해준다.

---

### 45번째 줄

```java
// return을 만나면 메서드는 즉시 종료되고, 오른쪽 값을 호출한 곳으로 돌려줍니다.
```

주석이다.

47번째 줄의 `return dto;`를 설명한다.

핵심:

```text
return = 값을 돌려주고 메서드를 끝낸다.
```

---

### 46번째 줄

```java
// 여기서는 NoticeController로 dto 객체를 돌려줍니다.
```

주석이다.

47번째 줄에서 `dto`가 어디로 가는지 설명한다.

`NoticeController.java`에는 이런 코드가 있다.

```java
NoticeDTO dto = output.list();
```

즉:

```text
NoticeService의 return dto
-> NoticeController의 output.list() 결과값
-> NoticeController의 NoticeDTO dto 변수에 들어감
```

---

### 47번째 줄

```java
return dto;
```

이 줄은 **반환문**이다.

나누면:

```text
return = 값을 돌려주는 Java 키워드
dto    = 17번째 줄에서 만든 NoticeDTO 타입 지역변수
;      = 문장 끝
```

여기서 `dto`의 타입은 `NoticeDTO`다.

왜 `NoticeDTO`를 return할 수 있는가?

13번째 줄에서 메서드 반환타입을 `NoticeDTO`라고 약속했기 때문이다.

```java
public NoticeDTO list() {
```

즉:

```text
13번째 줄: 이 메서드는 NoticeDTO를 돌려줄게.
47번째 줄: 실제로 NoticeDTO 타입 dto를 돌려줄게.
```

이 둘의 타입이 맞아야 한다.

---

### 48번째 줄

```java
		
```

빈 줄이다.

return 아래에는 보통 실행 코드를 더 쓰지 않는다.

이유:

```text
return을 만나면 메서드가 끝나기 때문
```

---

### 49번째 줄

```java
} // 메서드 영역 끝
```

이 줄은 `list()` 메서드 영역의 끝이다.

13번째 줄에서 시작한 `{`가 여기서 닫힌다.

정리:

```text
13번째 줄 public NoticeDTO list() {
-> 49번째 줄 } 에서 끝
```

13번째 줄부터 49번째 줄 사이에 선언된 변수들은 지역변수다.

예:

```text
dto
old
age
```

이 변수들은 `list()` 메서드가 끝나면 사라진다.

---

### 50번째 줄

```java

```

빈 줄이다.

메서드 끝과 클래스 끝을 구분해준다.

---

### 51번째 줄

```java
} // 클래스 영역 끝
```

이 줄은 `NoticeService` 클래스 영역의 끝이다.

8번째 줄에서 시작한 클래스가 여기서 끝난다.

정리:

```text
8번째 줄 public class NoticeService {
-> 51번째 줄 } 에서 끝
```

---

## 3. 이 파일에서 꼭 구분해야 할 것

### 3-1. 클래스 이름

```text
NoticeService
NoticeDTO
Test
System
```

설명:

- `NoticeService`는 현재 파일의 클래스다.
- `NoticeDTO`는 데이터를 담는 DTO 클래스다.
- `Test`는 직접 만든 연습용 클래스다.
- `System`은 Java가 기본으로 제공하는 클래스다.

### 3-2. 데이터 타입

```text
NoticeDTO
int
Test
String
```

위치:

```java
public NoticeDTO list()
NoticeDTO dto = new NoticeDTO();
int old = 30;
Test age;
```

정리:

- `NoticeDTO`는 직접 만든 클래스 타입이다.
- `int`는 Java 기본 정수 타입이다.
- `Test`도 직접 만든 클래스 타입이다.
- `"DTO"`, `"nothing"`은 `String` 타입 문자열 값이다.

### 3-3. 변수 이름

```text
dto
old
age
```

위치:

```java
NoticeDTO dto = new NoticeDTO();
int old = 30;
Test age;
```

정리:

- `dto`는 NoticeDTO 객체를 담는 변수다.
- `old`는 정수 30을 담는 변수다.
- `age`는 Test 타입 변수를 선언한 것이지만, 아직 객체 생성은 하지 않았다.

### 3-4. 메서드 이름

```text
list()
setVariable(...)
setNumber(...)
println(...)
```

정리:

- `list()`는 NoticeService 안에 직접 작성한 메서드다.
- `setVariable(...)`은 Lombok `@Setter`가 만들어주는 메서드다.
- `setNumber(...)`도 Lombok `@Setter`가 만들어주는 메서드다.
- `println(...)`은 Java가 제공하는 콘솔 출력 메서드다.

### 3-5. 생성자

```text
NoticeDTO()
Test()
```

정리:

- `new NoticeDTO()`에서 `NoticeDTO()`는 생성자 호출이다.
- `new Test()`에서 `Test()`는 생성자 호출이다.
- 생성자는 객체를 만들 때 호출된다.
- 생성자 이름은 클래스 이름과 같다.

---

## 4. 가장 중요한 연결 관계

### 4-1. 13번째 줄과 47번째 줄은 한 쌍이다

13번째 줄:

```java
public NoticeDTO list() {
```

47번째 줄:

```java
return dto;
```

해석:

```text
13번째 줄에서 NoticeDTO를 돌려주겠다고 약속했다.
47번째 줄에서 실제로 NoticeDTO 타입 dto를 돌려준다.
```

### 4-2. 17번째 줄과 21, 25번째 줄은 한 묶음이다

17번째 줄:

```java
NoticeDTO dto = new NoticeDTO();
```

21번째 줄:

```java
dto.setVariable("DTO");
```

25번째 줄:

```java
dto.setNumber(1);
```

해석:

```text
17번째 줄에서 DTO 상자를 만든다.
21번째 줄에서 문자 값을 넣는다.
25번째 줄에서 숫자 값을 넣는다.
```

### 4-3. NoticeService의 return은 Controller로 간다

NoticeService:

```java
return dto;
```

NoticeController:

```java
NoticeDTO dto = output.list();
```

흐름:

```text
NoticeController가 output.list()를 호출한다.
NoticeService의 list()가 실행된다.
NoticeService가 dto를 return한다.
그 dto가 Controller의 왼쪽 NoticeDTO dto 변수에 들어간다.
```

---

## 5. 외울 한 줄

```text
NoticeService의 list() 메서드는 NoticeDTO 타입 객체를 만들고,
그 안에 variable과 number 값을 넣은 뒤,
return dto로 NoticeController에게 돌려준다.
```

```text
뒤에 ()가 있으면 메서드 또는 생성자,
앞에 데이터 타입이 있으면 변수 선언,
new가 있으면 객체 생성이다.
```

