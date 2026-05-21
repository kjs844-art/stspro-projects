# kosmo_java_main MVC 흐름 정리

이 문서는 STS/Eclipse에서 `kosmo_java_main` 프로젝트를 볼 때, 파일들이 MVC 구조에서 어디에 속하고 데이터가 어디서 어디로 흐르는지 정리한 지도입니다.

## 1. 큰 그림

```text
MVC
├─ Controller
│  ├─ HomeController
│  ├─ NoticeController
│  ├─ MemberController
│  └─ QnaController
│
├─ Model
│  ├─ Service
│  │  └─ NoticeService
│  ├─ Mapper
│  │  ├─ NotIceMapper.java
│  │  └─ NoticeMapper.xml
│  ├─ DTO
│  │  └─ NoticeDTO
│  └─ DB
│     └─ TB_Notice
│
└─ View
   └─ JSP
      ├─ index.jsp
      ├─ notice/list.jsp
      ├─ notice/add.jsp
      ├─ member/mypage.jsp
      ├─ users/login.jsp
      ├─ users/join.jsp
      └─ board/*.jsp
```

## 2. 요청 흐름

```text
브라우저
↓
Controller
↓
Service
↓
Mapper.java
↓
Mapper.xml
↓
DB
↓
Mapper.xml
↓
Mapper.java
↓
Service
↓
Controller
↓
JSP
↓
브라우저 화면
```

## 3. 카테고리 표

| MVC 카테고리 | 현재 프로젝트 파일 | 하는 일 | 쉽게 말하면 |
|---|---|---|---|
| Controller | `src/main/java/com/java/main/homecontroller/HomeController.java` | `/` 주소 요청을 받음 | 손님이 첫 화면 달라고 하면 받는 직원 |
| Controller | `src/main/java/com/java/main/noticeservice/NoticeController.java` | `/notice/list`, `/notice/add` 요청을 받음 | 공지사항 요청을 받는 직원 |
| Controller | `src/main/java/com/java/main/member/MemberController.java` | 회원 관련 URL 요청을 받음 | 회원 페이지 담당 직원 |
| Controller | `src/main/java/com/java/main/qna/QnaController.java` | QnA/board 관련 URL 요청을 받음 | 게시판 페이지 담당 직원 |
| Service | `src/main/java/com/java/main/noticeservice/NoticeService.java` | Controller와 Mapper 사이에서 일을 처리함 | 직원이 주방에 주문 넣기 전에 정리하는 중간 담당 |
| Mapper.java | `src/main/java/com/java/main/noticeservice/NotIceMapper.java` | Java 코드에서 SQL을 부르는 통로 | Java와 SQL 사이의 주문서 |
| Mapper.xml | `src/main/java/com/java/main/noticeservice/NoticeMapper.xml` | 실제 SQL 작성 위치 | DB에게 보내는 실제 명령문 |
| DTO | `src/main/java/com/java/main/noticeservice/NoticeDTO.java` | DB에서 가져온 게시글 데이터 1개를 담음 | 데이터를 담는 상자 |
| DB | `TB_Notice` | 공지사항 데이터 저장 | 실제 데이터 창고 |
| View | `src/main/webapp/WEB-INF/views/**/*.jsp` | Controller가 넘긴 데이터를 화면에 보여줌 | 손님에게 보여주는 화면 |
| 설정 | `src/main/resources/application.properties` | JSP 위치, DB 연결, MyBatis 설정 | 프로젝트 주소록/설정표 |

## 4. Notice 목록 흐름

### 목표

브라우저에서 `/notice/list`로 들어오면 DB의 `TB_Notice` 데이터를 가져와서 `notice/list.jsp` 화면에 보여주는 흐름입니다.

| 순서 | 어디에서 | 코드/파일 | 어디로 감 | 의미 |
|---:|---|---|---|---|
| 1 | 브라우저 | `/notice/list` 요청 | `NoticeController` | 사용자가 공지사항 목록 페이지를 요청함 |
| 2 | Controller | `@GetMapping("/notice/list")` | `list(Model model)` | 이 URL은 `list()` 메서드가 처리함 |
| 3 | Controller | `output.list()` | `NoticeService.list()` | Controller가 Service에게 목록 데이터를 가져오라고 시킴 |
| 4 | Service | `took.transfer()` | `NotIceMapper.transfer()` | Service가 Mapper에게 DB 데이터를 가져오라고 시킴 |
| 5 | Mapper.java | `transfer()` | `NoticeMapper.xml` | Java Mapper 메서드와 XML SQL이 연결됨 |
| 6 | Mapper.xml | `<select id="transfer"...>` | DB `TB_Notice` | SQL이 실행되어 DB에서 공지사항 목록을 가져옴 |
| 7 | DB | `select * from "TB_Notice"` | Mapper | DB 결과가 Mapper 쪽으로 돌아옴 |
| 8 | Mapper | `List<NoticeDTO>` | Service | DB 결과가 DTO 목록으로 담겨 Service로 돌아옴 |
| 9 | Service | `return dto;` | Controller | Service가 목록 데이터를 Controller에게 돌려줌 |
| 10 | Controller | `model.addAttribute("output", dto)` | JSP | JSP에서 `output`이라는 이름으로 데이터를 쓸 수 있게 담음 |
| 11 | Controller | `return "notice/list"` | `notice/list.jsp` | Spring이 실제 JSP 파일을 찾음 |
| 12 | View | `/WEB-INF/views/notice/list.jsp` | 브라우저 | JSP가 화면을 만들어 사용자에게 보여줌 |

## 5. Notice 흐름 파일 번호

| 흐름 번호 | 파일 | 역할 |
|---:|---|---|
| 3 | `NoticeController.java` | notice URL 요청을 받고 Service를 호출함 |
| 4 | `NoticeService.java` | Controller와 Mapper 사이에서 중간 처리함 |
| 5 | `NotIceMapper.java` | Java에서 XML SQL을 부르는 Mapper 인터페이스 |
| 6 | `NoticeMapper.xml` | 실제 SQL이 있는 MyBatis XML 파일 |
| 7 | `NoticeDTO.java` | DB 결과를 담는 데이터 상자 |

## 6. JSP 연결 규칙

`application.properties`에 아래 설정이 있기 때문에 Controller의 `return` 값이 JSP 경로로 바뀝니다.

```text
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

그래서 아래처럼 연결됩니다.

| Controller return 값 | 실제 JSP 경로 |
|---|---|
| `return "index"` | `/WEB-INF/views/index.jsp` |
| `return "notice/list"` | `/WEB-INF/views/notice/list.jsp` |
| `return "notice/add"` | `/WEB-INF/views/notice/add.jsp` |
| `return "member/mypage"` | `/WEB-INF/views/member/mypage.jsp` |
| `return "users/login"` | `/WEB-INF/views/users/login.jsp` |
| `return "users/join"` | `/WEB-INF/views/users/join.jsp` |
| `return "board/add"` | `/WEB-INF/views/board/add.jsp` |
| `return "board/detail"` | `/WEB-INF/views/board/detail.jsp` |

## 7. 지금 꼭 잡아야 하는 핵심 20%

| 핵심 | 지금 이해할 말 |
|---|---|
| Controller | URL 요청을 받는 곳 |
| Service | Controller가 시킨 일을 실제로 처리하는 중간층 |
| Mapper | Java와 SQL을 연결하는 곳 |
| DTO | DB 데이터를 Java 안에서 들고 다니는 상자 |
| JSP | 최종 화면 |
| `model.addAttribute` | Java 데이터를 JSP로 넘기는 코드 |
| `return "notice/list"` | 어떤 JSP 화면을 보여줄지 정하는 코드 |

## 8. MyBatis Mapper XML 속성 설명

현재 notice 목록 조회 흐름에서 중요한 파일은 아래 두 개입니다.

```text
NotIceMapper.java
↓
NoticeMapper.xml
↓
DB
```

### 8-1. `<mapper namespace="...">`

```xml
<mapper namespace="com.java.main.noticeservice.NotIceMapper">
```

| 부분 | 뜻 |
|---|---|
| `mapper` | 이 XML 파일이 MyBatis SQL 파일이라는 뜻 |
| `namespace` | 이 XML이 어느 Java Mapper 인터페이스와 연결되는지 적는 자리 |
| `com.java.main.noticeservice.NotIceMapper` | 실제 Java Mapper 인터페이스의 전체 이름 |

쉽게 말하면 `namespace`는 **XML 파일과 Java 인터페이스를 연결하는 주소**입니다.

현재 프로젝트에서는 Java 쪽 Mapper가 아래 파일입니다.

```text
src/main/java/com/java/main/noticeservice/NotIceMapper.java
```

그래서 XML의 namespace도 반드시 아래처럼 맞아야 합니다.

```xml
<mapper namespace="com.java.main.noticeservice.NotIceMapper">
```

만약 XML에 아래처럼 잘못 적으면 에러가 납니다.

```xml
<mapper namespace="com.java.main.noticeservice.NoticeMapper">
```

왜냐하면 Java 파일 이름은 `NotIceMapper.java`이고, 인터페이스 이름도 `NotIceMapper`인데 XML에는 `NoticeMapper`라고 적었기 때문입니다.

에러 메시지에서 이런 식으로 나옵니다.

```text
Wrong namespace.
Expected 'com.java.main.noticeservice.NotIceMapper'
but found 'com.java.main.noticeservice.NoticeMapper'
```

즉 MyBatis가 이렇게 말하는 것입니다.

```text
"나는 NotIceMapper.java랑 연결하려고 왔는데,
XML에는 NoticeMapper라고 적혀 있네?
이름이 안 맞아서 연결 못 해."
```

### 8-2. `<select id="transfer" resultType="NoticeDTO">`

```xml
<select id="transfer" resultType="NoticeDTO">
    select * from "TB_Notice"
</select>
```

| 부분 | 뜻 |
|---|---|
| `select` | DB에서 데이터를 조회하는 SQL이라는 뜻 |
| `id="transfer"` | Java Mapper의 `transfer()` 메서드와 연결되는 이름 |
| `resultType="NoticeDTO"` | SQL 결과 한 줄을 `NoticeDTO` 객체에 담겠다는 뜻 |
| `select * from "TB_Notice"` | DB의 `TB_Notice` 테이블에서 모든 컬럼을 가져오겠다는 SQL |

Java Mapper 쪽에는 이런 메서드가 있습니다.

```java
public List<NoticeDTO> transfer();
```

XML에는 같은 이름의 `id`가 있어야 합니다.

```xml
<select id="transfer" resultType="NoticeDTO">
```

둘을 연결하면 이렇게 이해하면 됩니다.

```text
Service에서 took.transfer() 호출
↓
NotIceMapper.java의 transfer() 메서드 찾음
↓
NoticeMapper.xml에서 id="transfer"인 SQL 찾음
↓
select * from "TB_Notice" 실행
↓
DB 결과를 NoticeDTO에 담음
↓
List<NoticeDTO> 형태로 Service에게 돌아감
```

### 8-3. `resultType="NoticeDTO"`가 가능한 이유

원래는 전체 패키지 이름까지 길게 적어야 안전합니다.

```xml
resultType="com.java.main.noticeservice.NoticeDTO"
```

하지만 `application.properties`에서 MyBatis가 DTO 위치를 찾도록 설정하면 짧게 쓸 수 있습니다.

```properties
mybatis.type-aliases-package=com.java.main
```

이 설정의 의미는:

```text
"com.java.main 아래 패키지들을 찾아보고,
NoticeDTO라는 클래스가 있으면 짧은 이름 NoticeDTO로 써도 알아듣게 해줘."
```

### 8-4. 지금 코드에서 꼭 맞아야 하는 3개 이름

| Java/XML 위치 | 이름 | 서로 맞아야 하는 이유 |
|---|---|---|
| `NotIceMapper.java` | `transfer()` | Service가 호출하는 메서드 이름 |
| `NoticeMapper.xml` | `id="transfer"` | Java의 `transfer()`와 연결되는 SQL 이름 |
| `NoticeMapper.xml` | `namespace="com.java.main.noticeservice.NotIceMapper"` | XML과 Java Mapper 인터페이스를 연결하는 주소 |

한 문장으로 정리하면:

```text
namespace는 Java Mapper 파일 주소,
id는 Java Mapper 안의 메서드 이름,
resultType은 SQL 결과를 담을 DTO 상자 이름이다.
```

## 9. VS Code에서 같이 열어볼 참고 프로젝트

현재 `kosmo_java_main`과 가장 유사한 참고 프로젝트는 아래 프로젝트입니다.

```text
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_stspro
```

비슷한 이유:

| 비교 항목 | 현재 프로젝트 `kosmo_java_main` | 참고 프로젝트 `kosmo_joe_stspro` |
|---|---|---|
| Spring Boot / Gradle | 있음 | 있음 |
| JSP 화면 구조 | 있음 | 있음 |
| HomeController | 있음 | 있음 |
| MemberController | 있음 | 있음 |
| NoticeController | 있음 | 있음 |
| QnaController | 있음 | 있음 |
| NoticeService | 있음 | 있음 |
| NoticeDTO | 있음 | 있음 |
| notice/list.jsp | 있음 | 있음 |
| notice/add.jsp | 있음 | 있음 |
| notice/detail.jsp | 있음 | 있음 |

VS Code에서 볼 때는 이 폴더를 열면 됩니다.

```text
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_stspro
```

단, 지금 작업 기준은 계속 아래 프로젝트입니다.

```text
C:\Java-main-workspace\workspace\kosmo_java_main
```

## 10. 나중에 알아도 되는 80%

| 나중 항목 | 지금은 왜 미뤄도 되는지 |
|---|---|
| Entity | 현재 프로젝트는 JPA Entity보다 DTO/MyBatis 흐름이 먼저 중요함 |
| 복잡한 SQL Join | 지금은 목록 조회 흐름부터 잡는 게 우선 |
| MSA/Eureka/Gateway | 현재 MVC 기본 흐름을 이해한 뒤에 붙이는 단계 |
| React 연동 | Spring Controller/Service/Mapper 흐름을 잡은 뒤에 연결하면 됨 |
| AI 모델 연동 | Web 구조가 잡힌 뒤 Python/AI API를 붙이면 됨 |

## 11. 한 문장 요약

```text
Controller는 URL 요청을 받고,
Service에게 일을 시키고,
Service는 Mapper에게 DB 조회를 시키고,
Mapper XML은 SQL로 DB에서 데이터를 가져오고,
그 데이터는 DTO 목록으로 돌아와서,
Controller가 model.addAttribute로 JSP에 넘기고,
JSP가 최종 화면을 보여준다.
```
