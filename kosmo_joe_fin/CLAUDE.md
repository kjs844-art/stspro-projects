# Claude Code Handoff - kosmo_joe_fin

이 프로젝트는 사용자의 STS/Spring Boot 금융 포트폴리오 프로젝트입니다.

## 반드시 지킬 것

- 한국어로 설명합니다.
- 초보자 기준으로 아주 작게 설명합니다.
- 기존 변경사항을 함부로 되돌리지 않습니다.
- `.env`, API key, DB password, wallet private key, seed phrase는 절대 커밋하지 않습니다.
- 먼저 `AGENTS.md`, `START_HERE_RUN_THIS_PROJECT.md`, `KOSMO_JOE_FIN_PROGRESS_2026-05-21.md`를 읽고 시작합니다.

## 실행 정보

```text
Project: C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_fin
URL: http://localhost:18085
```

## 현재 중요한 흐름

```text
Controller -> Service -> Mapper/API -> DTO -> JSP/API response
```

## 최근 추가된 자동화 입구

```text
GET  /api/automation/status
POST /api/automation/zapier/events
```

이 엔드포인트는 Zapier, Orkes, 기타 MCP/자동화 도구가 Spring Boot 앱에 신호를 보내는 연습용 입구입니다.
