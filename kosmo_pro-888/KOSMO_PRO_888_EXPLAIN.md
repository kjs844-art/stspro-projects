# kosmo_pro-888 예약 기능 설명

이 프로젝트는 `kosmo_pro-SQ`의 흐름을 참고해서 `kosmo_pro-888`에 예약 CRUD 중 **등록, 목록, 삭제**를 붙인 학습용 버전입니다.
화면 문구와 메뉴 구성은 공개 검색으로 확인한 `888 GOGI KOREAN BBQ EASTWOOD / 888 고기 이스트우드`의 기본 매장 정보와 Korean BBQ 분위기를 참고했습니다.
매장 사진과 메뉴 이미지는 `src/main/resources/static/images`에 저장했고, JSP에서는 `/images/파일명.jpg` 형태로 불러옵니다.

## 한 줄 그림

브라우저 입력 -> `Booking.jsp` -> `HomeController` -> `ReservationService` -> `ReservationMapper.java` -> `ReservationMapper.xml` -> H2 DB

## 파일별 역할

1. `src/main/webapp/WEB-INF/views/Booking.jsp`
   - 사용자가 예약 폼에 `name`, `phone`, `guests`, `bookDate`, `bookTime`을 입력합니다.
   - 이 `name` 값들은 `ReservationDTO`의 필드명과 같아야 합니다.

2. `src/main/java/com/joe/_8/controller/HomeController.java`
   - `GET /booking`: 예약 목록을 DB에서 가져와 JSP로 보냅니다.
   - `POST /booking`: JSP 폼 데이터를 받아 DB 저장 로직으로 넘깁니다.
   - `POST /booking/delete`: 예약 id를 받아 삭제합니다.

3. `src/main/java/com/joe/_8/reservation/ReservationDTO.java`
   - 화면, Controller, Service, Mapper 사이를 이동하는 예약 데이터 박스입니다.

4. `src/main/java/com/joe/_8/service/ReservationService.java`
   - Controller와 DB 사이의 중간 담당자입니다.
   - 프로젝트가 시작될 때 `createTableIfNotExists()`로 예약 테이블을 준비합니다.

5. `src/main/java/com/joe/_8/mapper/ReservationMapper.java`
   - Java 쪽에서 부르는 DB 메서드 이름 목록입니다.
   - 여기의 메서드명은 XML의 `id`와 같아야 합니다.

6. `src/main/resources/mapper/ReservationMapper.xml`
   - 실제 SQL이 들어 있습니다.
   - `insertReservation`은 예약 저장, `findAll`은 목록 조회, `deleteReservation`은 삭제입니다.

## 꼭 외울 핵심 20%

- JSP 폼의 `name="bookDate"`는 DTO의 `bookDate` 필드와 연결됩니다.
- Controller의 `model.addAttribute("reservations", reservations)`는 JSP의 `${reservations}`와 연결됩니다.
- Mapper.java의 `findAll()`은 Mapper.xml의 `<select id="findAll">`과 연결됩니다.
- DB 컬럼 `book_date`는 설정의 `map-underscore-to-camel-case=true` 덕분에 DTO의 `bookDate`로 들어갑니다.

## 나중에 해도 되는 80%

- 로그인 권한에 따라 예약을 제한하기
- 실제 Oracle/PostgreSQL DB 계정으로 배포하기
- 예약 수정 기능 만들기
- 관리자 페이지에서 예약 승인/거절 만들기
