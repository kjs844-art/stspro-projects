# KOSMO BioGraph 통합 기획서 (한국어)

## 0. 한 줄 정의

KOSMO BioGraph는 신약·타깃·임상시험·논문·규제 이벤트를 하나의 근거 그래프로 연결하고, 무엇이 바뀌었는지 추적하는 오픈소스 생명과학 리서치 플랫폼이다.

현재의 kosmo_bio_stock 학습용 MVP를 버리지 않고 단계적으로 확장한다.

---

# 1. 최종 구조

~~~
                  KOSMO BioGraph
                        |
        +---------------+---------------+
        |               |               |
        v               v               v
   Open Source      Internal R&D      Hosted SaaS
        |               |               |
 공개 데이터 수집     과학 연구 워크플로     사용자용 웹서비스
 정규화/근거그래프     GPT-Rosalind 후보     알림/협업/호스팅
 변경 탐지            승인 후 내부 사용      유료 플랜
        |               |               |
        +---------------+---------------+
                        |
                  같은 기술 기반
~~~

세 가지 목표를 한 프로젝트에서 발전시키되, Rosalind 내부 연구 환경과 외부 고객용 SaaS는 반드시 분리한다.

---

# 2. 지금 이미 있는 것

현재 kosmo_bio_stock에는 다음이 있다.

- Java 21
- Spring Boot 3.5
- Gradle
- JSP/JSTL
- Controller -> Service -> DTO -> JSP 구조
- 키워드 검색
- OpenAlex API 호출
- 외부 JSON을 DTO로 변환하는 코드

따라서 처음부터 새 프로젝트를 만드는 것이 아니라 기존 코드를 Phase 0으로 취급한다.

---

# 3. 제품이 해결할 문제

생명과학 리서치에서는 정보가 여러 곳에 흩어져 있다.

- ClinicalTrials.gov: 임상시험
- PubMed / OpenAlex: 논문
- openFDA: 규제/안전 관련 공개 데이터
- UniProt: 단백질
- ChEMBL / PubChem: 화합물
- 기업 공개자료: 파이프라인 정보

연구자가 원하는 것은 단순 검색이 아니라 다음 질문에 대한 답이다.

~~~
이 약은 어떤 타깃을 겨냥하는가?
       ↓
그 타깃을 검증한 논문은 무엇인가?
       ↓
어떤 임상시험이 진행 중인가?
       ↓
지난주와 비교해서 무엇이 바뀌었는가?
       ↓
이 결론을 뒷받침하는 원문 출처는 무엇인가?
~~~

KOSMO BioGraph의 핵심은 AI 점수 자체가 아니라 근거와 출처를 추적할 수 있다는 것이다.

---

# 4. MVP 화면

## 4.1 통합 검색

검색 대상:

- Drug
- Target/Gene
- Disease
- Clinical Trial
- Publication
- FDA/Regulatory Event

## 4.2 Entity 페이지

약물 페이지 예:

~~~
Semaglutide
├─ Indications
├─ Targets
├─ Clinical Trials
├─ Publications
├─ Regulatory Events
├─ 최근 변경
└─ 원문 출처
~~~

## 4.3 Evidence Graph

~~~
Drug
  |
  +---- targets ----> Protein/Gene
  |
  +---- tested_in --> Trial
  |
  +---- discussed_in --> Publication
  |
  +---- affected_by --> Regulatory Event
~~~

## 4.4 Change Tracker

예:

~~~
NCT01234567

2026-09-20
Status: RECRUITING

2026-09-25
Status: ACTIVE_NOT_RECRUITING

변경 감지:
RECRUITING -> ACTIVE_NOT_RECRUITING
~~~

이 기능은 오픈소스 프로젝트의 핵심 차별화 후보다.

## 4.5 Watchlist / Alert

사용자가 Drug, Target, Trial, Company, Disease를 저장하고 변경이 발견되면 알림을 받는다.

## 4.6 Research Brief

결과 형식:

~~~
Research Question
Evidence Reviewed
Supporting Evidence
Conflicting Evidence
Unknown / Missing Evidence
Source List
Limitations
Generated At
Human Review
~~~

---

# 5. 기술 스택

## Backend — Java 21 + Spring Boot 3

기존 프로젝트를 그대로 발전시킨다.

담당:

- REST API
- 사용자/조직/워크스페이스
- 인증/권한
- Watchlist
- Alert
- Evidence 저장
- Change Event 저장
- SaaS 기능
- 외부 API orchestration

추가할 Spring 기술:

- Spring Web
- Spring Validation
- Spring Data JPA
- Spring Security
- Spring Actuator
- Flyway
- PostgreSQL Driver

---

# 6. Scientific / AI Worker

## Python 3.12 + FastAPI

처음부터 넣지 않는다. Java MVP가 안정된 후 별도 research-worker로 추가한다.

사용 이유:

- 생명과학 Python 생태계
- BioPython
- pandas / polars
- 네트워크/그래프 분석
- 향후 연구 자동화
- 향후 승인된 GPT-Rosalind 내부 연구 workflow

담당:

~~~
논문/생물 데이터 처리
        ↓
identifier normalization
        ↓
scientific analysis
        ↓
research workflow
        ↓
내부 연구 결과
~~~

중요: 외부 SaaS 요청이 직접 GPT-Rosalind로 전달되는 구조는 만들지 않는다.

---

# 7. Frontend

## Phase 1

현재 JSP 유지.

이유:

- 기존 프로젝트를 빠르게 이어갈 수 있음
- Spring MVC 구조 학습 유지
- API/DB 기능에 집중 가능

## Phase 2

React + TypeScript + Vite로 분리.

~~~
React Web
   |
   | HTTPS JSON
   v
Spring Boot REST API
   |
   v
PostgreSQL
~~~

React에서 만들 화면:

- Search
- Dashboard
- Drug page
- Target page
- Trial page
- Evidence graph
- Change timeline
- Watchlist
- Research brief viewer
- Team workspace

## Mobile

처음부터 Android/iOS 네이티브 앱을 별도로 만들지 않는다.

우선 React 웹을 responsive + installable PWA 형태로 만든다.

실제 모바일 사용자 수가 충분해지면 React Native / Expo 또는 네이티브 앱을 검토한다.

---

# 8. Database — PostgreSQL

초기 핵심 테이블:

~~~
users
organizations
workspaces

drugs
targets
diseases
trials
publications
regulatory_events

evidence
source_snapshots
change_events

watchlists
watchlist_items
alerts

research_briefs
audit_events
~~~

처음부터 별도 Vector DB는 도입하지 않는다. Semantic Search가 실제로 필요해졌을 때 pgvector를 검토한다.

---

# 9. 데이터 수집 우선순위

1. ClinicalTrials.gov
2. OpenAlex
3. PubMed / NCBI
4. openFDA

이후 후보:

- UniProt
- ChEMBL
- PubChem
- Ensembl
- Crossref

각 데이터 소스마다 Connector를 만든다.

~~~
fetch
 -> parse
 -> normalize
 -> validate
 -> save snapshot
 -> compare
 -> evidence
~~~

---

# 10. 가장 중요한 데이터 설계: Provenance

각 record에 최소한 다음을 저장한다.

~~~
source
source_id
source_url
retrieved_at
connector_version
~~~

AI가 해석했다면 추가:

~~~
model
workflow_version
evidence_ids
generated_at
human_review_status
~~~

즉 "이 약은 Target X와 관련 있다"라고만 저장하지 않고 Claim -> Evidence -> 원문 출처의 연결을 남긴다.

---

# 11. Open Source로 공개할 것

기본 공개 후보:

- Data Connector
- Normalization schema
- Evidence model
- Provenance model
- Snapshot engine
- Change detection engine
- REST API
- CLI
- 기본 UI
- Docker 개발환경
- 테스트
- sample dataset

다른 개발자는 유료 서비스에 가입하지 않아도 다음이 가능해야 한다.

~~~
git clone
docker compose up
검색
데이터 수집
변경 탐지
API 호출
~~~

---

# 12. SaaS에서 돈을 받을 것

코드를 감춰서 돈을 버는 것이 아니라 운영과 편의성으로 돈을 번다.

## Free

- 제한된 watchlist
- 기본 검색
- 기본 evidence
- 느린 refresh

## Pro

- Watchlist 확대
- 빠른 refresh
- Alert
- History
- Research Brief 저장
- Export

## Team

- 팀 Workspace
- Annotation
- Review
- 공동 Watchlist
- Audit History

## Enterprise

- SSO
- RBAC
- private connector
- retention control
- SLA
- managed deployment

---

# 13. Open Source 라이선스

현재 제안: Apache-2.0

장점:

- OSI 오픈소스 라이선스
- 상업 이용 가능
- 수정/배포 가능
- 명시적 patent grant
- 기업/개발자가 채택하기 편함

단점:

- 다른 회사도 코드를 가져가 상업 서비스를 만들 수 있음

대안: AGPL-3.0

네트워크 서비스 수정본 공개 의무가 더 강하다.

최종 라이선스는 바로 적용하지 않고 프로젝트 소유자가 선택한 뒤 LICENSE 파일을 추가한다.

---

# 14. Codex for Open Source 전략

목표는 단순히 public repo를 만드는 것이 아니다.

~~~
Public Repo
  +
실제로 설치 가능
  +
문서
  +
Release
  +
Issue
  +
PR
  +
사용자
  +
Maintainer 활동
~~~

신청 전 목표:

- dedicated public repo
- LICENSE
- README
- CONTRIBUTING
- SECURITY
- CI
- tagged release
- 외부 사용자 테스트
- issue triage 기록
- PR review 기록

API Credit 사용 목적 예:

- PR review
- issue triage
- test 생성
- release automation
- OSS security review

유료 SaaS 고객의 추론 비용을 지원받는 방식으로 설명하지 않는다.

---

# 15. GPT-Rosalind 전략

Rosalind 신청 목적은 다음처럼 잡는다.

> 공개 생명과학 데이터를 대상으로 Drug, Target, Trial, Publication, Regulatory Evidence를 연결하고, 출처가 추적 가능한 재현성 높은 연구 워크플로를 만드는 내부 R&D 플랫폼.

좋은 연구 질문:

- Target X와 Disease Y의 관계를 지지하는 근거는?
- 동일 mechanism을 테스트하는 임상 프로그램은?
- 최근 trial landscape에서 무엇이 변경되었나?
- 논문 간 상충되는 결과는?
- 추가 검토가 필요한 evidence gap은?

피해야 할 신청 중심 문구:

- 어떤 바이오 주식을 사야 하나
- 주가가 얼마나 오를까
- 자동매매
- 임상 성공률을 보장
- 환자 치료 결정

신청 준비:

- 법적/적격 조직
- public website
- research mission
- governance
- data policy
- security policy
- approved users
- audit log
- reproducible workflow

Rosalind의 현재 고객용 상업 제품 제한은 신청/배포 시점에 다시 공식 문서를 확인한다.

---

# 16. 보안 / 데이터 정책

초기에는 다음 데이터를 다루지 않는다.

- 환자 개인식별정보
- PHI
- 개인 유전체 데이터
- 비공개 clinical data
- 민감한 실험 설계 데이터

처음에는 공개 데이터만 사용한다.

필수 보안:

- API Key Git commit 금지
- Environment Secret
- Backend Authorization
- Workspace/Tenant Isolation
- Rate Limit
- Validation
- SQL Parameterization/JPA
- Audit Log
- Backup + Restore Test
- Dependency Scan
- Branch Protection

---

# 17. 구현 순서

## Phase 0 — 현재

이미 존재:

- Spring Boot
- JSP
- OpenAlex
- Search
- DTO 구조

## Phase 1 — Research Data MVP

목표:

- PostgreSQL
- JPA
- ClinicalTrials.gov Connector
- Publication 저장
- Trial 저장
- Source/Provenance 저장

완료 조건:

~~~
검색어 입력
 -> 실제 공개 데이터 수집
 -> DB 저장
 -> 출처 표시
~~~

## Phase 2 — Change Engine

- SourceSnapshot
- hash
- field diff
- ChangeEvent

## Phase 3 — React UI

- React
- TypeScript
- Vite
- Spring REST API
- Evidence Graph / Timeline

## Phase 4 — Open Source 정식화

- dedicated repository
- 결정된 라이선스
- CI
- CONTRIBUTING
- SECURITY
- issue templates
- v0.1.0 release
- Docker Compose

## Phase 5 — Research Brief

- evidence set
- deterministic brief
- 일반 AI 보조
- citations
- human review

## Phase 6 — Hosted Beta

- account
- workspace
- watchlist
- scheduled sync
- alerts
- cloud deploy

## Phase 7 — Rosalind Readiness

- organization
- governance
- research workflow
- internal environment
- audit
- access application

승인된 경우에만 GPT-Rosalind를 연구 환경에 추가한다.

## Phase 8 — SaaS

- Free
- Pro
- Team
- Enterprise

---

# 18. 추천 개발 우선순위

현재 가장 먼저 코딩할 것은 AI가 아니다.

~~~
1. ClinicalTrials Connector
2. PostgreSQL
3. Provenance
4. Snapshot
5. Change Detection
6. Evidence API
7. React
8. AI Research Brief
9. Internal Rosalind
10. SaaS Scale
~~~

이 순서를 지키면 프로젝트가 단순한 AI Wrapper가 아니라 실제 데이터/리서치 인프라가 된다.

---

# 19. 최종 목표

~~~
KOSMO BioGraph
│
├─ OSS
│   └─ 개발자와 연구자가 직접 설치 가능한 도구
│
├─ Research
│   └─ 출처 기반 생명과학 연구 워크플로
│
└─ SaaS
    └─ 운영/협업/알림/호스팅으로 수익화
~~~

이 프로젝트의 핵심 자산은 코드 + 데이터 구조 + provenance + 변경 이력 + 연구 workflow + 커뮤니티가 된다.
