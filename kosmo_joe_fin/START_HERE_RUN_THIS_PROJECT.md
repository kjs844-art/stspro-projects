# START HERE - KOSMO JOE FIN 실행 안내

## 정확한 프로젝트

STS/Eclipse에서 이 프로젝트를 실행합니다.

```text
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_fin
```

비슷한 프로젝트가 많아서 헷갈리기 쉽습니다.

현재 작업 중인 최종 금융 프로젝트는 `kosmo_joe_fin`입니다.

## 실행 주소

```text
http://localhost:18085
```

## 중요한 포트

`src/main/resources/application.properties`에서 기본 포트를 아래처럼 맞췄습니다.

```text
server.port=18085
```

그래서 STS에서 `Run As > Spring Boot App`으로 실행해도 기본 주소는 `18085`입니다.

## 만약 실행이 안 될 때

가장 흔한 원인은 이미 같은 포트에서 Java 서버가 켜져 있는 경우입니다.

확인 명령:

```powershell
netstat -ano | Select-String ':18085'
```

현재 이 문서를 만들 때는 아래 프로세스가 `18085`를 사용 중이었습니다.

```text
PID 34592
```

STS에서 다시 실행하고 싶으면, 먼저 기존 실행 서버를 종료해야 포트 충돌이 안 납니다.

## 현재 MVP 기능

```text
/stocks
/stocks/search?ticker=NVDA&plan=FREE
/stocks/search?ticker=NVDA&plan=PREMIUM
/etfs
/etfs/search?ticker=QQQ&plan=FREE
/etfs/search?ticker=QQQ&plan=PREMIUM
/members/plans
/watchlist
/news?symbol=NVDA
/api/stocks/NVDA
/shadow-risk
/shadow-risk?keyword=crypto
```

## 지하경제 지표 방향

포트폴리오에서는 불법 딥웹/다크웹 직접 수집이 아니라, 합법 공개 데이터 기반으로 구현합니다.

사용 후보:

```text
GDELT
Have I Been Pwned Pwned Passwords
OpenSanctions
FRED
World Bank
SEC EDGAR
OpenDART
KOSIS
CoinGecko
뉴스 RSS/API
AML/제재/부패/사이버 리스크 공개 지표
```

화면 이름 예시:

```text
Shadow Risk Index
Global Underground Economy Risk Index
공개 데이터 기반 지하경제 영향 지표
```

주의 문구:

```text
본 지표는 공개 데이터와 뉴스 키워드를 기반으로 산출한 참고용 리스크 지표이며,
특정 국가, 기업, 개인의 불법 행위를 단정하지 않습니다.
```
