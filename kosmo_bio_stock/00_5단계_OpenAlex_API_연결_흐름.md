# kosmo_bio_stock 5단계 OpenAlex API 연결 흐름

목표: 검색어를 입력하면 기존 샘플 데이터뿐 아니라, OpenAlex 공개 논문 API에서 관련 논문 데이터를 가져와 같은 JSP 표에 출력합니다.

---

## 현재 완료 범위

| 단계 | 내용 | 상태 |
|---|---|---|
| 1단계 | 프로젝트 뼈대 만들기 | 완료 |
| 2단계 | `/radar/list` 기본 화면 만들기 | 완료 |
| 3단계 | `Controller -> Service -> DTO -> Model -> JSP` 흐름 만들기 | 완료 |
| 4단계 | 검색어로 샘플 데이터 필터링하기 | 완료 |
| 5단계 | OpenAlex 외부 API 연결하기 | 완료 |

---

## 전체 흐름

```text
브라우저 검색창
-> /radar/list?keyword=cancer
-> BioRadarController.list()
-> BioRadarService.findSignals(keyword)
-> 샘플 데이터 검색
-> OpenAlex API 호출
-> JSON 응답 받기
-> BioSignalDTO로 변환
-> Model에 담기
-> radar/list.jsp 출력
```

---

## 왜 OpenAlex를 붙였나?

OpenAlex는 논문/연구 메타데이터를 검색할 수 있는 공개 API입니다.

초기 연습용으로 좋은 이유:

- API 키 없이 시작 가능
- 바이오/헬스케어 키워드와 잘 맞음
- JSON 응답을 DTO로 바꾸는 연습에 적합
- 나중에 NCBI, FDA, 주가 API로 확장하기 쉬움

---

## 핵심 파일

| 파일 | 역할 |
|---|---|
| `BioRadarController.java` | 검색어를 받고 Service 결과를 JSP로 보냄 |
| `BioRadarService.java` | 샘플 검색 + OpenAlex API 호출 + DTO 변환 |
| `BioSignalDTO.java` | 샘플 데이터와 API 데이터를 같은 모양으로 담음 |
| `radar/list.jsp` | 샘플/API 결과를 같은 표에 출력 |

---

## 핵심 코드 1: API 주소 만들기

```java
URI uri = UriComponentsBuilder.fromUriString("https://api.openalex.org/works")
    .queryParam("search", keyword)
    .queryParam("per-page", 3)
    .build()
    .toUri();
```

뜻:

```text
OpenAlex의 works API에 keyword 검색어를 붙여서 요청 주소를 만든다.
```

예시:

```text
https://api.openalex.org/works?search=cancer&per-page=3
```

---

## 핵심 코드 2: API 호출하기

```java
JsonNode response = restTemplate.getForObject(uri, JsonNode.class);
```

뜻:

```text
Java가 OpenAlex 주소로 요청을 보내고,
돌아온 JSON 데이터를 JsonNode 타입으로 받는다.
```

---

## 핵심 코드 3: JSON에서 값 꺼내기

```java
String title = textOrDefault(work, "title", "제목 없음");
int year = intOrDefault(work, "publication_year", 0);
int citedByCount = intOrDefault(work, "cited_by_count", 0);
```

뜻:

```text
API 응답 JSON에서 제목, 출판연도, 인용 수를 꺼낸다.
```

---

## 핵심 코드 4: JSON을 DTO로 바꾸기

```java
apiSignals.add(new BioSignalDTO(
    "논문",
    keyword,
    title,
    "OpenAlex API / " + year,
    "근거",
    "검색어와 관련된 공개 논문 메타데이터입니다. 인용 수: " + citedByCount,
    score
));
```

뜻:

```text
API에서 받은 JSON 데이터를 JSP가 이해할 수 있는 BioSignalDTO 상자로 바꾼다.
```

JSP 입장에서는 샘플 데이터인지 API 데이터인지 크게 상관없습니다.  
둘 다 `BioSignalDTO` 모양이기 때문에 같은 표에서 출력할 수 있습니다.

---

## 핵심 코드 5: API 실패 처리

```java
catch (RestClientException ex) {
    apiSignals.add(new BioSignalDTO(...));
}
```

뜻:

```text
인터넷 연결 문제나 API 오류가 나도 화면이 죽지 않게,
실패 메시지를 DTO로 만들어 JSP에 보여준다.
```

---

## 테스트 주소

OpenAlex 논문 API 확인:

```text
http://localhost:18082/radar/list?keyword=cancer
```

샘플 데이터 + OpenAlex 같이 확인:

```text
http://localhost:18082/radar/list?keyword=FDA
```

반도체 검색:

```text
http://localhost:18082/radar/list?keyword=반도체
```

---

## 오늘 꼭 기억할 것

```text
외부 API 응답(JSON)
-> Service에서 받음
-> DTO로 바꿈
-> Controller가 Model에 담음
-> JSP가 출력함
```

이 구조만 이해하면, 나중에 API가 OpenAlex에서 NCBI, FDA, 주가 API로 바뀌어도 큰 흐름은 같습니다.

