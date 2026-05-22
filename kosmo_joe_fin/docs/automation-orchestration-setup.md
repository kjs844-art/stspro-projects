# kosmo_joe_fin 자동화 / 오케스트레이션 세팅

## 한 줄 그림

```text
Zapier / Orkes / Harness
-> kosmo_joe_fin Spring Boot API
-> 금융 데이터 조회 / 리스크 분석 / DB 저장
-> JSP 화면 또는 알림
```

## 지금 추가된 것

Spring Boot 안에 외부 자동화 도구가 호출할 수 있는 작은 API를 추가했다.

```text
GET  /api/automation/status
POST /api/automation/zapier/events
```

초보자식으로 말하면:

```text
Zapier = 다른 앱에서 버튼을 눌러주는 사람
Webhook = "이 주소로 메시지 보내줘"라고 열어둔 문
Spring Controller = 그 메시지를 받는 접수 직원
Orchestration = 여러 일을 순서대로 시키는 작업 지휘표
Harness = GitHub 코드가 깨졌는지 검사하고 배포하는 자동 공장
```

## Zapier 연결 방향

현재 Codex 안에는 Zapier 직접 커넥터가 보이지 않는다.
대신 Zapier 공식 MCP 또는 Zapier Webhooks로 연결할 수 있다.

로컬 테스트 주소:

```text
http://localhost:18085/api/automation/zapier/events
```

Zapier에서 실제로 호출하려면 로컬 주소는 외부에서 접근이 안 되므로, 나중에 배포 주소가 필요하다.

예시:

```text
https://your-domain.com/api/automation/zapier/events
```

보낼 JSON 예시:

```json
{
  "source": "zapier",
  "eventType": "risk_keyword_requested",
  "keyword": "crypto",
  "ticker": "NVDA",
  "message": "Refresh public risk data",
  "payload": {
    "plan": "FREE"
  }
}
```

배포 후 보안을 켜려면 환경변수를 넣는다.

```text
KOSMO_AUTOMATION_WEBHOOK_SECRET=원하는_긴_문자열
```

그 다음 Zapier 요청 Header에 추가한다.

```text
X-Kosmo-Automation-Secret: 같은_긴_문자열
```

## Harness 연결 방향

Harness는 CI/CD 도구다.

이 프로젝트에서는 처음부터 배포까지 욕심내지 말고, 1단계는 이것만 한다.

```text
GitHub에 push
-> Harness가 Gradle build 실행
-> 실패하면 배포하지 않음
```

초기 템플릿:

```text
.harness/kosmo-joe-fin-ci.yaml
```

실제 Harness 계정에서 필요한 것:

```text
1. GitHub connector
2. Java 21 빌드 환경
3. ./gradlew.bat clean build 또는 ./gradlew clean build
4. 나중에 Render/Netlify/VPS 같은 배포 대상
```

## Orkes / 오케스트레이션 연결 방향

Orkes Conductor 같은 오케스트레이션 도구는 “여러 작업 순서표”에 가깝다.

예시 흐름:

```text
Zapier가 키워드 전달
-> kosmo_joe_fin이 Webhook 수신
-> Shadow Risk 분석
-> News API 갱신
-> DB 저장
-> 결과 알림
```

초기 워크플로우 예시는:

```text
orchestration/orkes/kosmo-fin-risk-refresh-workflow.json
```

## 오늘 기준 생존 우선순위

반드시 먼저 할 20%:

```text
1. Spring Boot가 외부 요청을 받을 API 만들기
2. Webhook JSON 구조 정하기
3. Gradle build가 통과하는지 확인하기
4. 나중에 Zapier/Harness/Orkes 계정에서 주소와 키만 연결하기
```

나중에 해도 되는 80%:

```text
1. 복잡한 배포 승인 단계
2. Kubernetes
3. 여러 환경 dev/stage/prod 분리
4. 고급 장애 복구
5. 완전한 마이크로서비스 오케스트레이션
```
