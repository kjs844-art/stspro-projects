# KOSMO_JOE_FIN 서비스 기획 및 구현 설계

작성일: 2026-05-17  
프로젝트 경로: `C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_fin`  
현재 실행 포트: `8081`

---

## 1. 서비스 한 줄 정의

`KOSMO_JOE_FIN`은 주식, ETF, 어닝, 뉴스, 글로벌 시장, 크립토, xStocks, 원자재, 부동산/REITs, 채권, 지하경제 리스크, 학업-현실 연결 학습까지 제공하는 **금융 데이터 + 글로벌 리스크 + 교육형 리서치 플랫폼**이다.

포트폴리오용 표현:

```text
주식/ETF/어닝/뉴스/글로벌 시장/백테스트/대체자산/학습 콘텐츠를 통합하고,
무료/프리미엄 회원에게 차등 제공하는 AI 기반 금융 리서치 플랫폼
```

서비스명 후보:

```text
FinSight AI
Global Financial & Learning Intelligence Platform
```

---

## 2. 핵심 방향

이 프로젝트는 단순한 주식 검색 사이트가 아니라 아래 흐름을 목표로 한다.

```text
사용자 검색
  -> 금융/경제/산업/학업 데이터 조회
  -> 무료/유료 회원 권한에 따라 정보 범위 조절
  -> JSP 화면에 카드, 표, 차트 형태로 제공
  -> 나중에는 AI 요약 리포트까지 확장
```

---

## 3. 전체 메뉴 구성

최종 메뉴 후보:

```text
홈
주식 분석
ETF 분석
어닝 발표
뉴스/정치/산업
글로벌 시장
크립토
xStocks
원자재
부동산/REITs
채권/금리
지하경제 영향 지수
백테스트
지식 연결 학습
마이페이지
```

---

## 4. 무료/유료 회원 정책

### 4.1 무료 회원

무료 회원은 핵심 정보만 볼 수 있다.

```text
- 주식 기본 정보
- 뉴스 일부
- ETF 기본 정보
- ETF 상위 구성 종목 일부
- 어닝 예정일/최근 결과 일부
- 글로벌 주요 지수 일부
- 대표 원자재/금리 일부
- 지하경제 종합 점수
- 학습 주제 기본 설명
```

### 4.2 유료 회원

유료 회원은 상세 분석, 전체 데이터, 백테스트, 실시간/준실시간 기능을 사용할 수 있다.

```text
- 뉴스 전체
- 산업/정치/정책 뉴스 필터
- ETF 전체 구성 종목 및 비중
- 운용보수, 운용사, AUM, 섹터 비중
- 어닝 발표 실시간/준실시간 추적
- 어닝콜 transcript
- 기본적 분석 전체
- 기술적 분석 지표 선택
- 1년/3년 백테스트
- 글로벌 시장 상세 데이터
- 원자재/채권/부동산 상세 분석
- 지하경제 영향 경로 분석
- xStocks 비교 데이터
- AI 요약 리포트
- 학업-현실 연결 심화 학습
```

### 4.3 권한 DTO 예시

```java
@Data
public class AccessPolicyDTO {
    private boolean premium;
    private int newsLimit;
    private int etfHoldingLimit;
    private boolean showFullFundamental;
    private boolean showTechnicalAnalysis;
    private boolean allowBacktest;
    private int maxBacktestYears;
    private boolean showEarningsTranscript;
    private boolean showShadowImpactPath;
    private boolean showAiReport;
}
```

---

## 5. 현재 프로젝트 상태 기준

현재 프로젝트에는 아래 패키지들이 이미 존재한다.

```text
com.joe.fin.home
com.joe.fin.stock
com.joe.fin.news
com.joe.fin.fundamental
com.joe.fin.technical
com.joe.fin.member
com.joe.fin.etf
com.joe.fin.etf.list
com.joe.fin.etf.component
```

현재 `etf` 관련 클래스들은 거의 비어 있는 상태라 새로 설계해야 한다.

현재 `application.properties`에는 Alpha Vantage, OpenSanctions 등 API 설정이 들어가 있다. 문서에는 API 키를 직접 적지 않는다.

---

## 6. 권장 패키지 구조

기능이 커지므로 패키지는 역할별로 나누는 것이 좋다.

```text
com.joe.fin.home
com.joe.fin.member
com.joe.fin.stock
com.joe.fin.etf
com.joe.fin.news
com.joe.fin.earnings
com.joe.fin.fundamental
com.joe.fin.technical
com.joe.fin.backtest
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

초반에는 너무 많은 패키지를 한 번에 만들지 않는다.  
MVP 순서에 맞춰 필요한 패키지만 하나씩 만든다.

---

## 7. JSP 화면 구성

권장 JSP 위치:

```text
src/main/webapp/WEB-INF/views/
```

권장 JSP 파일:

```text
index.jsp
stock-search.jsp
stock-detail.jsp
etf-search.jsp
etf-detail.jsp
earnings.jsp
news-dashboard.jsp
market-dashboard.jsp
crypto-dashboard.jsp
xstock-detail.jsp
commodity-dashboard.jsp
realestate-dashboard.jsp
bond-dashboard.jsp
shadow-dashboard.jsp
shadow-detail.jsp
backtest-form.jsp
backtest-result.jsp
learning-search.jsp
learning-detail.jsp
member-login.jsp
member-plan.jsp
```

---

## 8. URL 설계

```text
GET  /                         홈

GET  /stock/search             주식 검색 화면
GET  /stock/detail?symbol=NVDA 주식 상세

GET  /etf/search               ETF 검색 화면
GET  /etf/detail?symbol=QQQ    ETF 상세

GET  /earnings?symbol=NVDA     어닝 정보

GET  /news                     뉴스 대시보드
GET  /news/category?type=policy 정치/정책 뉴스
GET  /news/category?type=industry 산업 뉴스

GET  /market                   글로벌 시장 대시보드
GET  /crypto                   크립토 대시보드
GET  /xstock?symbol=NVDAx      xStocks 상세

GET  /commodity                원자재 대시보드
GET  /realestate               부동산/REITs
GET  /bond                     채권/금리

GET  /shadow                   글로벌 지하경제 영향 지수
GET  /shadow/country?code=KR   국가별 지하경제 리스크

GET  /backtest/form            백테스트 입력
POST /backtest/run             백테스트 실행

GET  /learning                 지식 연결 학습 검색
GET  /learning/topic?keyword=피보나치 학습 상세
```

---

## 9. 주식 분석 기능

### 9.1 사용자 흐름

```text
사용자가 NVDA 입력
  -> StockController
  -> StockService
  -> 회사 기본 정보 조회
  -> NewsService로 관련 뉴스 조회
  -> FundamentalService로 기본적 분석 조회
  -> TechnicalService로 기술적 분석 조회
  -> stock-detail.jsp 출력
```

### 9.2 표시 데이터

```text
티커
회사명
거래소
섹터
산업
현재가
등락률
시가총액
PER
EPS
배당수익률
52주 최고/최저
관련 뉴스
산업 뉴스
기본적 분석
기술적 분석
```

### 9.3 패키지 구성

```text
com.joe.fin.stock
 ├─ StockController.java
 ├─ StockService.java
 ├─ StockSearchDTO.java
 └─ StockDetailDTO.java
```

### 9.4 JSP 구성

```text
stock-search.jsp
stock-detail.jsp
```

---

## 10. ETF 분석 기능

### 10.1 사용자 흐름

```text
사용자가 QQQ 입력
  -> ETFController
  -> ETFService
  -> ETF 기본 정보 조회
  -> ETF 구성 종목 조회
  -> 무료/유료 권한에 따라 구성 종목 개수 제한
  -> etf-detail.jsp 출력
```

### 10.2 표시 데이터

```text
ETF 코드
ETF 이름
운용사
운용보수
AUM
상장일
현재가
등락률
구성 회사 리스트
각 회사 비중 %
섹터 비중
자산군 비중
```

### 10.3 패키지 구성

```text
com.joe.fin.etf
 ├─ ETFController.java
 ├─ ETFService.java
 ├─ ETFSearchDTO.java
 ├─ ETFDetailDTO.java
 ├─ ETFHoldingDTO.java
 └─ ETFAllocationDTO.java
```

### 10.4 JSP 구성

```text
etf-search.jsp
etf-detail.jsp
```

---

## 11. 뉴스/정치/산업 뉴스

뉴스는 단순 종목 뉴스가 아니라 글로벌 정보 허브로 만든다.

### 11.1 뉴스 분류

```text
주요 뉴스
정치/정책 뉴스
산업 뉴스
종목 뉴스
ETF/섹터 뉴스
크립토/xStocks 뉴스
원자재 뉴스
금리/채권 뉴스
부동산 뉴스
```

### 11.2 표시 데이터

```text
제목
언론사
발행일
요약
관련 국가
관련 산업
관련 종목
감성 점수
원문 링크
```

### 11.3 패키지 구성

```text
com.joe.fin.news
 ├─ NewsController.java
 ├─ NewsService.java
 ├─ NewsDTO.java
 └─ NewsCategoryDTO.java
```

### 11.4 JSP 구성

```text
news-dashboard.jsp
```

---

## 12. 어닝 발표 기능

### 12.1 목표

유료 플랜에서는 어닝 발표 결과를 실시간 또는 준실시간으로 추적한다.

완전한 초단위 실시간은 비용과 데이터 제공사 조건이 필요하므로, 현실적으로는 아래 방식이 좋다.

```text
1분 또는 5분마다 어닝 API 조회
  -> 새 결과가 있는지 확인
  -> DB 또는 메모리에 저장
  -> 화면에서 자동 새로고침/Ajax로 갱신
```

### 12.2 표시 데이터

```text
발표 예정일
발표 시간: 장전/장마감 후
예상 EPS
실제 EPS
EPS 서프라이즈
예상 매출
실제 매출
매출 서프라이즈
어닝콜 링크
어닝콜 transcript
발표 직후 주가 반응
```

### 12.3 패키지 구성

```text
com.joe.fin.earnings
 ├─ EarningsController.java
 ├─ EarningsService.java
 ├─ EarningsCalendarDTO.java
 ├─ EarningsResultDTO.java
 └─ EarningsTranscriptDTO.java
```

### 12.4 JSP 구성

```text
earnings.jsp
```

---

## 13. 기본적 분석

### 13.1 표시 데이터

```text
시가총액
PER
PEG
EPS
매출
영업이익
ROE
부채비율
배당수익률
52주 최고/최저
```

### 13.2 패키지 구성

```text
com.joe.fin.fundamental
 ├─ FundamentalController.java
 ├─ FundamentalService.java
 └─ FundamentalDTO.java
```

---

## 14. 기술적 분석

### 14.1 표시 데이터

```text
SMA 20
SMA 60
RSI 14
MACD
거래량 변화
현재 추세: 상승/하락/중립
```

### 14.2 패키지 구성

```text
com.joe.fin.technical
 ├─ TechnicalController.java
 ├─ TechnicalService.java
 ├─ TechnicalIndicatorRequestDTO.java
 └─ TechnicalIndicatorResultDTO.java
```

---

## 15. 백테스트 기능

### 15.1 목표

사용자가 특정 지표와 조건을 입력하면 과거 1년 또는 3년 데이터를 기준으로 가상 매매 결과를 계산한다.

### 15.2 첫 전략 예시

초반에는 RSI 전략 하나만 만든다.

```text
RSI 30 이하: 매수
RSI 70 이상: 매도
기간: 최근 1년
초기 투자금: 10,000달러
```

### 15.3 결과 표시

```text
종목
기간
전략명
초기 투자금
최종 평가금액
총 수익률
승률
최대 낙폭
거래 횟수
매수/매도 내역
```

### 15.4 패키지 구성

```text
com.joe.fin.backtest
 ├─ BacktestController.java
 ├─ BacktestService.java
 ├─ BacktestRequestDTO.java
 ├─ BacktestResultDTO.java
 └─ BacktestTradeDTO.java
```

### 15.5 JSP 구성

```text
backtest-form.jsp
backtest-result.jsp
```

---

## 16. 글로벌 시장 대시보드

### 16.1 핵심 국가

기본 시장 대시보드는 아래 5개국을 중심으로 한다.

```text
한국
호주
미국
중국
일본
```

### 16.2 추가 시장

```text
크립토 시장
```

### 16.3 국가별 표시 데이터

```text
대표 지수
환율
기준금리
CPI
실업률
주요 뉴스
정치/정책 리스크
산업 뉴스
```

### 16.4 국가별 예시

```text
한국: KOSPI, KOSDAQ, USD/KRW, 반도체/배터리/조선
미국: S&P 500, Nasdaq, Dow, VIX, 10년물 금리, FOMC/CPI
중국: Shanghai Composite, Hang Seng, USD/CNY, 부동산/수출입
일본: Nikkei 225, TOPIX, USD/JPY, 엔화/수출기업
호주: ASX 200, AUD/USD, 원자재/철광석/에너지
```

### 16.5 패키지 구성

```text
com.joe.fin.market
 ├─ MarketController.java
 ├─ MarketService.java
 ├─ CountryMarketDTO.java
 ├─ MarketIndexDTO.java
 ├─ CurrencyDTO.java
 ├─ MarketNewsDTO.java
 └─ GlobalDashboardDTO.java
```

### 16.6 JSP 구성

```text
market-dashboard.jsp
```

---

## 17. 크립토 시장

### 17.1 표시 데이터

```text
BTC
ETH
SOL
XRP
전체 시총
24시간 거래량
공포탐욕지수
스테이블코인 흐름
RWA/xStocks 뉴스
규제 뉴스
```

### 17.2 패키지 구성

```text
com.joe.fin.crypto
 ├─ CryptoController.java
 ├─ CryptoService.java
 ├─ CryptoMarketDTO.java
 └─ CryptoRiskDTO.java
```

### 17.3 JSP 구성

```text
crypto-dashboard.jsp
```

---

## 18. xStocks 기능

### 18.1 목표

xStocks는 토큰화된 미국 주식/ETF를 의미한다. 포트폴리오에서는 실제 매매 기능보다 **조회/비교/교육용 데이터 제공**으로 잡는 것이 안전하다.

### 18.2 표시 데이터

```text
xStock 심볼: NVDAx
기초자산: NVDA
토큰 네트워크: Solana/Ethereum/Mantle 등
토큰 가격
기초 주식 가격
프리미엄/디스카운트
24시간 거래량
유동성
거래 가능 플랫폼
담보 구조
Proof of Reserves 링크
배당/분할 반영 방식
```

### 18.3 비교표 예시

```text
항목          NVDA 일반 주식       NVDAx
거래 시간     정규장 중심           24/7 가능
보유 방식     증권 계좌             온체인 지갑
가격 기준     나스닥                토큰 시장
배당/분할     증권사 반영           리베이스 방식
```

### 18.4 패키지 구성

```text
com.joe.fin.xstock
 ├─ XStockController.java
 ├─ XStockService.java
 ├─ XStockDTO.java
 └─ XStockCompareDTO.java
```

### 18.5 JSP 구성

```text
xstock-detail.jsp
```

### 18.6 주의 문구

```text
본 기능은 토큰화 주식에 대한 정보 제공 및 교육 목적이며,
거래 권유나 투자 자문이 아닙니다.
```

---

## 19. 원자재 기능

### 19.1 원자재 분류

```text
귀금속: 금, 은, 플래티늄, 팔라듐
산업금속: 구리, 알루미늄, 니켈, 철광석
에너지: WTI, Brent, 천연가스
농산물: 커피, 설탕, 오렌지 주스, 옥수수, 밀, 대두
```

### 19.2 표시 데이터

```text
원자재명
현재가
등락률
관련 산업
주요 수요 국가
주요 뉴스
경제 영향
```

예시:

```text
구리 가격 상승
  -> 중국 경기 회복 기대
  -> 호주 달러 강세 가능성
  -> 산업재/광산주 관심 증가
```

### 19.3 패키지 구성

```text
com.joe.fin.commodity
 ├─ CommodityController.java
 ├─ CommodityService.java
 ├─ CommodityDTO.java
 └─ CommodityNewsDTO.java
```

### 19.4 JSP 구성

```text
commodity-dashboard.jsp
```

---

## 20. 부동산/REITs 기능

### 20.1 초기 범위

직접 부동산 매물까지 다루면 너무 커진다.  
초기에는 **부동산 시장 지표 + REITs** 중심으로 구현한다.

### 20.2 표시 데이터

```text
미국 주택가격지수
모기지 금리
주택착공건수
건축허가
상업용 부동산 리스크
REITs 가격
REITs 배당수익률
REITs 섹터
```

### 20.3 REITs 예시

```text
VNQ
IYR
SCHH
XLRE
O
PLD
AMT
SPG
```

### 20.4 패키지 구성

```text
com.joe.fin.realestate
 ├─ RealEstateController.java
 ├─ RealEstateService.java
 ├─ RealEstateIndexDTO.java
 └─ ReitDTO.java
```

### 20.5 JSP 구성

```text
realestate-dashboard.jsp
```

---

## 21. 채권/금리 기능

### 21.1 표시 데이터

```text
미국 2년물
미국 10년물
미국 30년물
장단기 금리차
회사채 스프레드
하이일드 스프레드
한국/일본/중국/호주 기준금리
각국 10년물 국채금리
중앙은행 발표
```

### 21.2 경제 연결 예시

```text
금리 상승
  -> 채권 가격 하락
  -> 성장주 부담
  -> 리츠 부담
  -> 달러 강세
  -> 원자재 가격 압박
```

### 21.3 패키지 구성

```text
com.joe.fin.bond
 ├─ BondController.java
 ├─ BondService.java
 ├─ BondYieldDTO.java
 └─ YieldCurveDTO.java
```

### 21.4 JSP 구성

```text
bond-dashboard.jsp
```

---

## 22. 글로벌 지하경제 영향 지수

### 22.1 핵심 관점

지하경제는 5개국에만 국한하지 않는다.  
전세계적으로 보고, 그 리스크가 실제 경제와 금융 시장에 어떤 영향을 주는지 연결한다.

기능명 후보:

```text
Global Shadow Economy Impact Index
글로벌 지하경제 영향 지수
```

### 22.2 목표

```text
전세계 국가/지역의 비공식 자금 흐름, 제재, 부패, 밀수, 크립토 리스크를 추적하고,
그 영향이 주식/환율/원자재/크립토/5개 핵심국 경제에 어떻게 전파되는지 보여준다.
```

### 22.3 표시 데이터

```text
전세계 종합 점수
지역별 위험도
국가별 위험도
최근 상승 국가
주요 원인
관련 뉴스
제재/불법 금융 키워드
경제 영향 경로
영향 받는 시장
```

### 22.4 점수 예시

```text
뉴스 위험 점수
제재 데이터 점수
크립토 위험 점수
경제 스트레스 점수
무역/밀수 리스크 점수
정치/부패 리스크 점수
```

### 22.5 영향 경로 예시

```text
제재 강화
  -> 원자재/에너지 우회 거래 증가
  -> 유가/운송비 변동
  -> 호주 원자재 시장 영향
  -> 한국/일본 제조업 비용 영향
  -> 미국 인플레이션 기대 영향
```

```text
크립토 불법 자금 흐름 증가
  -> 규제 강화 뉴스 증가
  -> 크립토 시장 변동성 상승
  -> xStocks/RWA 투자심리 악화
  -> 위험자산 선호도 하락
  -> 나스닥/기술주 단기 압박
```

### 22.6 5개 핵심국과 연결

```text
한국: 에너지 수입 비용, 반도체 공급망, 원/달러 환율
미국: 규제 정책, 달러 유동성, 기술주 투자심리
중국: 무역/자본통제, 원자재 수요, 공급망 리스크
일본: 엔화 안전자산 흐름, 수입물가, 제조업 비용
호주: 원자재 수출, 중국 수요, AUD 환율
```

### 22.7 패키지 구성

```text
com.joe.fin.shadow
 ├─ ShadowIndexController.java
 ├─ ShadowIndexService.java
 ├─ ShadowGlobalIndexDTO.java
 ├─ ShadowCountryRiskDTO.java
 ├─ ShadowRegionRiskDTO.java
 ├─ ShadowFactorDTO.java
 ├─ ShadowEventDTO.java
 ├─ ShadowImpactPathDTO.java
 └─ ShadowAffectedMarketDTO.java
```

### 22.8 JSP 구성

```text
shadow-dashboard.jsp
shadow-detail.jsp
```

### 22.9 필수 주의 문구

```text
본 지수는 공개 데이터와 뉴스 키워드를 기반으로 산출한 참고용 리스크 지표이며,
특정 국가, 기업, 개인의 불법 행위를 단정하지 않습니다.
```

---

## 23. 학업-현실 연결 학습 기능

### 23.1 핵심 방향

이 기능은 투자 교육만을 위한 것이 아니다.  
학교에서 배우는 개념이 실제 사회, 경제, 산업, 기술, 투자, AI에서 어떻게 연결되는지 보여주는 학습 서비스다.

기능명 후보:

```text
Knowledge Bridge
지식 연결 학습
School Knowledge to Real World
```

### 23.2 피보나치 예시

```text
주제: 피보나치 수열

1. 학교에서 배우는 내용
   - 1, 1, 2, 3, 5, 8, 13 ...
   - 앞의 두 수를 더해 다음 수를 만드는 규칙

2. 쉬운 설명
   - 계단 오르기
   - 토끼 번식 문제
   - 꽃잎, 소라껍데기, 해바라기 씨앗 배열

3. 수학 개념
   - 수열
   - 점화식
   - 황금비

4. 컴퓨터에서의 활용
   - 재귀 함수
   - 동적 계획법
   - 알고리즘 효율

5. 경제/주식에서의 연결
   - 피보나치 되돌림
   - 지지선/저항선 분석
   - 단, 항상 맞는 공식은 아님
```

### 23.3 다른 주제 예시

```text
평균/분산 -> 주식 변동성, 시험 점수 분석
확률 -> 보험, 게임, 투자 리스크
지수/로그 -> 복리, 인구 증가, 감염 확산
미분 -> 속도, 최적화, 머신러닝
행렬 -> 이미지 처리, AI, 그래픽
통계 -> 여론조사, 경제지표, 데이터 분석
전기 -> 배터리, 전기차, 반도체
화학 -> 의약품, 소재, 배터리
생명과학 -> 바이오, 유전자 치료, 백신
환율 -> 여행, 수입물가, 기업 실적
금리 -> 대출, 집값, 주식시장
무역 -> 관세, 수출기업, 물가
```

### 23.4 패키지 구성

```text
com.joe.fin.learning
 ├─ LearningController.java
 ├─ LearningService.java
 ├─ TopicDTO.java
 ├─ SchoolConceptDTO.java
 ├─ RealWorldExampleDTO.java
 ├─ FinanceConnectionDTO.java
 └─ PracticeActivityDTO.java
```

### 23.5 JSP 구성

```text
learning-search.jsp
learning-detail.jsp
```

### 23.6 무료/유료 구분

무료:

```text
주제 기본 설명
현실 예시 2~3개
간단 그림/표
```

유료:

```text
학년별 설명
심화 응용 사례
연습 활동
금융/산업 연결
AI 맞춤 설명
PDF 리포트
```

---

## 24. AI 리포트 기능

최종 확장 기능으로 AI 요약 리포트를 제공할 수 있다.

### 24.1 예시

```text
오늘의 시장 요약
NVDA 분석 리포트
QQQ ETF 구성 변화 요약
이번 주 어닝 체크리스트
지하경제 리스크 영향 요약
피보나치 개념 학습 리포트
```

### 24.2 패키지 구성

```text
com.joe.fin.ai
 ├─ AiReportController.java
 ├─ AiReportService.java
 ├─ AiReportRequestDTO.java
 └─ AiReportResultDTO.java
```

---

## 25. 데이터 API 후보

현재 프로젝트에는 Alpha Vantage API 키 설정이 있으므로, 초반에는 Alpha Vantage 중심으로 시작하는 것이 현실적이다.

### 25.1 Alpha Vantage

사용 후보:

```text
회사 개요
뉴스 감성
일봉/시계열
기술 지표
ETF 프로필
어닝 일정/어닝 결과
```

공식 문서:

```text
https://www.alphavantage.co/documentation/
```

### 25.2 YahooFinanceAPI

현재 `build.gradle`에 이미 추가되어 있다.

사용 후보:

```text
현재가
종목명
거래소
간단 가격 데이터
```

단, ETF 구성 종목, 운용보수, 운용사 같은 상세 ETF 데이터에는 부족할 수 있다.

### 25.3 OpenSanctions

사용 후보:

```text
제재 대상자/기관 검색
글로벌 리스크 데이터
지하경제 영향 지수 보조 데이터
```

### 25.4 유료 API 후보

실시간 어닝, 고급 ETF, 글로벌 시장 데이터는 유료 API가 필요할 수 있다.

후보:

```text
Intrinio
Polygon.io
Finnhub
IEX Cloud 계열
Earnings API 전문 서비스
```

---

## 26. 데이터베이스 테이블 후보

초반에는 API 조회만으로 시작하고, 나중에 저장이 필요할 때 DB를 붙인다.

### 26.1 회원

```text
members
- member_id
- email
- password
- name
- membership_type: FREE/PREMIUM
- created_at
```

### 26.2 관심 종목

```text
watchlist
- watchlist_id
- member_id
- symbol
- asset_type: STOCK/ETF/CRYPTO/XSTOCK/COMMODITY
- created_at
```

### 26.3 백테스트 결과

```text
backtest_results
- result_id
- member_id
- symbol
- strategy_name
- period_years
- initial_cash
- final_value
- return_rate
- win_rate
- max_drawdown
- created_at
```

### 26.4 어닝 캐시

```text
earnings_cache
- earnings_id
- symbol
- fiscal_period
- expected_eps
- actual_eps
- surprise
- report_date
- updated_at
```

### 26.5 지하경제 지수 캐시

```text
shadow_index_cache
- shadow_id
- country_code
- region
- score
- risk_level
- main_reason
- updated_at
```

### 26.6 학습 주제

```text
learning_topics
- topic_id
- keyword
- school_subject
- school_concept
- real_world_examples
- finance_connection
- created_at
```

---

## 27. 구현 MVP 순서

한 번에 다 만들면 프로젝트가 터질 수 있다.  
아래 순서대로 작게 완성한다.

### MVP 1: 주식 + ETF + 무료/유료 기본 구조

```text
1. Member membershipType 만들기
2. AccessPolicyDTO 만들기
3. 주식 검색 화면 만들기
4. NVDA 검색 시 기본 정보 출력
5. ETF 검색 화면 만들기
6. QQQ 검색 시 ETF 기본 정보 출력
7. 무료/유료에 따라 뉴스/보유종목 개수 제한
```

### MVP 2: 뉴스 + 기본적 분석 + 기술적 분석

```text
1. 뉴스 DTO/Service 만들기
2. 종목 관련 뉴스 출력
3. 산업/정치/정책 뉴스 분류
4. FundamentalDTO 만들기
5. TechnicalIndicatorResultDTO 만들기
6. RSI/SMA 정도만 먼저 출력
```

### MVP 3: 백테스트

```text
1. BacktestRequestDTO 만들기
2. BacktestResultDTO 만들기
3. RSI 전략 하나 구현
4. 1년 백테스트 결과 출력
5. 유료 회원만 3년 백테스트 허용
```

### MVP 4: 어닝 발표

```text
1. EarningsCalendarDTO 만들기
2. 다음 어닝일 표시
3. 최근 어닝 결과 표시
4. 유료 회원에게 transcript/상세 결과 제공
5. 나중에 자동 갱신 추가
```

### MVP 5: 글로벌 시장 + 원자재 + 채권

```text
1. 5개국 시장 대시보드
2. 크립토 대시보드
3. 원자재 대시보드
4. 채권/금리 대시보드
5. 자산군 간 영향 설명
```

### MVP 6: 지하경제 영향 지수 + xStocks

```text
1. ShadowGlobalIndexDTO 만들기
2. 전세계 종합 점수 표시
3. 국가/지역별 위험도 표시
4. 경제 영향 경로 표시
5. xStocks 조회/비교 화면 추가
```

### MVP 7: 지식 연결 학습

```text
1. LearningController 만들기
2. 주제 검색 화면 만들기
3. 피보나치 예시 하나 완성
4. 수학/과학/사회 주제 확장
5. 유료 회원에게 심화 자료 제공
```

---

## 28. 첫 구현 추천 순서

실제 코딩은 아래처럼 아주 작게 시작한다.

```text
1. 현재 컴파일 에러 먼저 해결
2. 프로젝트 실행 확인
3. Member/AccessPolicyDTO 설계
4. StockDetailDTO 만들기
5. stock-search.jsp 만들기
6. stock-detail.jsp 만들기
7. NVDA 검색 결과 출력
8. ETFDetailDTO/ETFHoldingDTO 만들기
9. etf-detail.jsp 출력
10. 무료/유료 제한 적용
```

가장 먼저 해야 할 일은 **실행 가능한 상태로 만드는 것**이다.  
실행이 안 되면 어떤 기능도 붙일 수 없다.

---

## 29. 포트폴리오 발표용 요약

```text
본 프로젝트는 단순 종목 조회 서비스를 넘어,
주식/ETF/어닝/뉴스/글로벌 시장/원자재/채권/부동산/크립토/xStocks 데이터를 통합하고,
지하경제 리스크와 학업 지식을 실제 경제와 연결해 보여주는
AI 기반 금융 리서치 및 학습 플랫폼입니다.

무료 회원에게는 기본 정보와 제한된 데이터를 제공하고,
프리미엄 회원에게는 상세 분석, 백테스트, 어닝 추적, 리스크 영향 경로,
AI 요약 리포트까지 제공합니다.
```

---

## 30. 주의사항

금융 데이터와 투자 관련 정보는 반드시 아래 문구를 포함한다.

```text
본 서비스의 정보는 교육 및 참고용이며, 투자 자문이나 매수/매도 권유가 아닙니다.
투자 결정은 사용자의 책임이며, 실제 투자 전 전문가와 상담할 수 있습니다.
```

xStocks와 지하경제 지수에는 아래 문구를 추가한다.

```text
xStocks 관련 정보는 교육 및 데이터 조회 목적이며, 특정 지역 사용자에게 거래를 권유하지 않습니다.
```

```text
지하경제 영향 지수는 공개 데이터와 뉴스 키워드를 기반으로 산출한 참고용 리스크 지표이며,
특정 국가, 기업, 개인의 불법 행위를 단정하지 않습니다.
```

