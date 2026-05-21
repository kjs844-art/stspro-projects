# KOSMO_JOE_FIN AI Collaboration Handoff

작성일: 2026-05-17

이 문서는 Claude, Gemini, Antigravity, OpenCode 등 다른 AI 도구와 `KOSMO_JOE_FIN` 프로젝트를 함께 진행하기 위한 협업 지시서입니다.

---

## 1. 프로젝트 기본 정보

```text
프로젝트명: KOSMO_JOE_FIN
실제 프로젝트 경로:
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_fin

Python 연습/데이터 분석 프로젝트 경로:
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_fin_python

Obsidian 연동 기획 문서 경로:
G:\My Drive\Obsidian(2Brain)\MainObsidian\KOSMO_JOE_FIN_SERVICE_PLAN.md
```

메인 기획 문서:

```text
KOSMO_JOE_FIN_SERVICE_PLAN.md
```

다른 AI 도구는 먼저 위 기획 문서를 읽고, 그 범위 안에서 작업해야 합니다.

---

## 2. 서비스 목표

`KOSMO_JOE_FIN`은 단순한 주식 검색 사이트가 아닙니다.

목표는 다음과 같습니다.

```text
주식, ETF, 어닝, 뉴스, 글로벌 시장, 원자재, 채권, 부동산/REITs,
크립토, xStocks, 지하경제 영향 지수, 학업-현실 연결 학습을 제공하는
금융 데이터 + 글로벌 리스크 + 교육형 리서치 플랫폼
```

---

## 3. 현재 우선순위

지금 가장 중요한 것은 모든 기능을 한 번에 만드는 것이 아니라, 실행 가능한 MVP를 작게 완성하는 것입니다.

### 1순위

```text
현재 Spring Boot 프로젝트가 에러 없이 실행되게 만들기
```

### 2순위

```text
주식 검색 기능
- 사용자가 NVDA 같은 티커 입력
- 회사 기본 정보 표시
- 관련 뉴스 일부 표시
```

### 3순위

```text
ETF 검색 기능
- 사용자가 QQQ 같은 ETF 입력
- ETF 기본 정보 표시
- 구성 종목과 비중 표시
- 무료/유료 회원에 따라 정보 제한
```

### 4순위

```text
무료/유료 회원 권한 정책
- FREE
- PREMIUM
```

---

## 4. 다른 AI 도구에게 요청할 때의 원칙

다른 AI 도구는 아래 원칙을 지켜야 합니다.

```text
1. 사용자는 초보자이므로 설명은 한국어로, 작게, 단계별로 한다.
2. 한 번에 많은 파일을 만들지 않는다.
3. 기존 프로젝트 구조를 먼저 읽고, 그 구조에 맞춰 최소한으로 수정한다.
4. 실제 파일 경로를 확인하지 않고 추측하지 않는다.
5. Spring Boot 실행 여부를 항상 확인한다.
6. 민감한 API Key는 문서나 코드에 직접 노출하지 않는다.
7. 투자 정보는 교육/참고용이라는 문구를 유지한다.
```

---

## 5. 권장 패키지 구조

초반 핵심 패키지:

```text
com.joe.fin.member
com.joe.fin.stock
com.joe.fin.etf
com.joe.fin.news
com.joe.fin.fundamental
com.joe.fin.technical
com.joe.fin.backtest
```

나중 확장 패키지:

```text
com.joe.fin.earnings
com.joe.fin.market
com.joe.fin.crypto
com.joe.fin.xstock
com.joe.fin.commodity
com.joe.fin.realestate
com.joe.fin.bond
com.joe.fin.shadow
com.joe.fin.learning
com.joe.fin.ai
```

---

## 6. Java/Spring 역할

Spring Boot는 서비스 본체입니다.

```text
Controller: URL 요청을 받음
Service: 실제 데이터/API 처리
DTO: 화면으로 보낼 데이터 그릇
Mapper: DB와 연결
JSP: 사용자에게 보여주는 화면
```

초기 구현은 아래 흐름을 우선합니다.

```text
Controller
  -> Service
  -> DTO
  -> Model
  -> JSP
```

---

## 7. Python 역할

Python은 별도 보조 도구입니다.

```text
API 테스트
CSV/Excel 정리
웹 크롤링/스크래핑 실험
pandas 데이터 분석
백테스트 알고리즘 실험
나중에 AI/FastAPI 서버로 확장
```

현재 Python 프로젝트:

```text
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_fin_python
```

Python은 Spring Boot를 대체하는 것이 아니라, 데이터 분석/AI 도구로 보조합니다.

---

## 8. API 및 데이터 수집 방향

초기 API 후보:

```text
Alpha Vantage: 주식, ETF, 뉴스, 기술지표, 어닝
Finnhub: 종목 뉴스, 어닝, 회사 정보
CoinGecko: 크립토
FRED: 미국 경제지표, 금리
World Bank: 전세계 국가 지표
KOSIS/OpenDART: 한국 통계/기업공시
OpenSanctions: 제재/리스크 데이터
```

API 외 데이터 수집:

```text
CSV
Excel
RSS
공공데이터 포털
웹 크롤링/스크래핑
```

우선순위:

```text
1. 공식 API
2. 공식 CSV/Excel
3. RSS
4. 약관을 확인한 웹 크롤링
```

---

## 9. 무료/유료 회원 정책

무료 회원:

```text
기본 주식 정보
뉴스 일부
ETF 구성 종목 일부
어닝 기본 정보
시장 대표 지표 일부
학습 기본 설명
```

유료 회원:

```text
뉴스 전체
ETF 전체 구성 종목
어닝 실시간/준실시간 추적
기술적 분석
백테스트
글로벌 시장 상세
지하경제 영향 경로
AI 요약 리포트
학습 심화 자료
```

---

## 10. 주의 문구

금융 정보 화면에는 반드시 아래 문구를 포함합니다.

```text
본 서비스의 정보는 교육 및 참고용이며, 투자 자문이나 매수/매도 권유가 아닙니다.
투자 결정은 사용자의 책임입니다.
```

지하경제 지수 화면에는 아래 문구를 포함합니다.

```text
본 지수는 공개 데이터와 뉴스 키워드를 기반으로 산출한 참고용 리스크 지표이며,
특정 국가, 기업, 개인의 불법 행위를 단정하지 않습니다.
```

---

## 11. Claude/Gemini/OpenCode에게 줄 첫 작업 추천

다른 AI 도구에게 바로 맡기기 좋은 작업은 아래와 같습니다.

```text
1. KOSMO_JOE_FIN_SERVICE_PLAN.md 읽고 요약하기
2. 현재 프로젝트 컴파일 에러 원인 찾기
3. StockService.java의 YahooFinanceAPI 사용 가능 메서드 확인하기
4. ETFDetailDTO / ETFHoldingDTO 초안 제안하기
5. 무료/유료 회원 AccessPolicyDTO 초안 제안하기
6. stock-detail.jsp 화면 와이어프레임 제안하기
7. Python에서 Alpha Vantage API 테스트 코드 제안하기
```

한 번에 전체 기능 구현을 맡기지 말고, 작은 단위로 요청해야 합니다.

---

## 12. 협업 요청용 프롬프트

Claude, Gemini, Antigravity, OpenCode 등에 아래처럼 요청하면 됩니다.

```text
너는 KOSMO_JOE_FIN 프로젝트의 보조 개발자야.
먼저 KOSMO_JOE_FIN_SERVICE_PLAN.md와 KOSMO_JOE_FIN_AI_COLLABORATION_HANDOFF.md를 읽고,
현재 프로젝트 구조를 확인한 뒤, 한 번에 하나의 작은 작업만 제안해줘.

사용자는 Java/Spring/Python 초보자이므로 설명은 한국어로 쉽게 해줘.
기존 구조를 크게 바꾸지 말고, Controller-Service-DTO-JSP 흐름을 유지해줘.
민감한 API Key는 절대 출력하지 말고, 투자 정보는 교육/참고용이라는 주의 문구를 유지해줘.
```

