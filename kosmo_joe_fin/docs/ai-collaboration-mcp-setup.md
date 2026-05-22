# Claude Code / OpenCode / DeepSeek / MCP 협업 세팅

## 핵심 결론

AI끼리 직접 대화하게 만드는 것보다, 아래 4가지를 공유하게 만드는 것이 안전하다.

```text
1. 같은 프로젝트 폴더
2. 같은 GitHub 저장소
3. 같은 작업 규칙 문서
4. 같은 MCP 서버 목록
```

## 역할 분리

```text
Codex        = 실제 파일 수정, 실행 확인, Windows/STS 정리
Claude Code  = 큰 구조 리뷰, 리팩토링 제안, 코드 설명
OpenCode Zen = 다른 모델로 빠른 코드 수정/검토
DeepSeek     = 저렴한 긴 컨텍스트 보조 검토 또는 초안 작성
Gemini CLI   = Google 모델 기반 긴 설명/검토/명령 보조
Antigravity  = IDE 안에서 프로젝트 전체를 보며 작업하는 AI 개발 환경
MCP          = GitHub, Zapier, Supabase, Neon 같은 외부 도구 연결 통로
```

초보자식 비유:

```text
프로젝트 폴더 = 한 책상
GitHub = 공용 작업 노트
MCP = 각 도구로 연결되는 멀티탭
AGENTS.md / CLAUDE.md = 작업 규칙표
```

## 현재 프로젝트에 추가한 공통 규칙

```text
AGENTS.md
CLAUDE.md
GEMINI.md
ANTIGRAVITY.md
```

Claude Code는 `CLAUDE.md`를 먼저 읽게 하고,
Gemini CLI는 `GEMINI.md`를 먼저 읽게 하고,
Antigravity/Codex/OpenCode에는 `AGENTS.md` 내용을 기준으로 작업시키면 된다.

## OpenCode Zen / DeepSeek

OpenCode Zen은 OpenCode에서 제공하는 검증 모델 목록/게이트웨이에 가깝다.
DeepSeek은 OpenCode에서 직접 연결하거나 OpenRouter 같은 공급자를 통해 연결할 수 있다.

처음에는 모델 세팅보다 이것만 먼저 한다.

```text
opencode에서 이 프로젝트 폴더 열기
-> AGENTS.md 읽게 하기
-> 작은 작업 하나만 맡기기
-> 변경 전후 git diff 확인
```

예시 프롬프트:

```text
AGENTS.md를 먼저 읽고, kosmo_joe_fin 프로젝트에서 /api/automation/status 흐름만 설명해줘. 파일 수정은 하지 마.
```

## Claude Code MCP 기본 형태

Claude Code는 프로젝트 루트의 `.mcp.json` 또는 `claude mcp add` 방식으로 MCP를 붙일 수 있다.

예시 명령:

```powershell
claude mcp add --transport http zapier https://mcp.zapier.com/api/mcp/YOUR_SERVER_ID
```

예시 JSON 형태:

```json
{
  "mcpServers": {
    "zapier": {
      "type": "http",
      "url": "https://mcp.zapier.com/api/mcp/YOUR_SERVER_ID"
    }
  }
}
```

주의:

```text
실제 URL/토큰이 들어간 .mcp.json은 GitHub에 올리지 않는다.
```

## OpenCode MCP 기본 형태

OpenCode는 `opencode.jsonc`의 `mcp` 아래에 서버를 넣는다.

예시는 이 파일을 참고한다.

```text
docs/opencode.example.jsonc
```

처음부터 MCP를 많이 켜면 모델 컨텍스트가 무거워진다.
처음 추천은 2개만:

```text
1. GitHub
2. Zapier 또는 Supabase 중 하나
```

## Gemini CLI MCP 기본 형태

Gemini CLI는 사용자 설정의 `mcpServers`로 MCP를 붙일 수 있다.

예시는 이 파일을 참고한다.

```text
docs/gemini-settings.example.json
```

명령으로 추가하는 형태는 보통 아래처럼 시작한다.

```powershell
gemini mcp add github npx -y @modelcontextprotocol/server-github
```

실제 토큰은 명령의 `--env` 또는 사용자 설정/환경변수로 넣는다.

## Antigravity MCP 기본 형태

Antigravity는 보통 전역 MCP 설정 파일을 쓴다.

```text
C:\Users\USER\.gemini\antigravity\mcp_config.json
```

예시는 이 파일을 참고한다.

```text
docs/antigravity-mcp.example.json
```

중요:

```text
Antigravity는 프로젝트 폴더 기준 상대경로가 헷갈릴 수 있으므로,
MCP command나 파일 경로는 가능하면 절대경로로 적는다.
```

## Zapier MCP

Zapier는 공식 MCP를 제공한다.
즉, Codex에 내장 커넥터가 없어도 Zapier MCP URL을 발급받으면 MCP 클라이언트에 연결할 수 있다.

실제 연결 전 준비:

```text
1. Zapier MCP 서버 만들기
2. 필요한 앱 액션만 추가하기
3. MCP URL 복사하기
4. Claude Code/OpenCode/Codex 중 하나에 붙이기
```

## 안전 규칙

```text
1. MCP 서버는 필요한 것만 켠다.
2. GitHub/파일시스템/터미널 권한은 특히 조심한다.
3. 비밀키는 .env 또는 각 도구의 secret 저장소에 둔다.
4. 여러 AI가 동시에 같은 파일을 고치게 하지 않는다.
5. 한 AI는 코드 작성, 다른 AI는 리뷰처럼 역할을 나눈다.
```

## kosmo_joe_fin 추천 협업 루틴

```text
1. Codex가 작은 기능을 구현한다.
2. Claude Code에게 변경된 파일만 리뷰시킨다.
3. OpenCode/DeepSeek에게 초보자 설명 또는 대안 코드를 물어본다.
4. 최종 선택은 Codex에서 실행/검증한다.
5. GitHub에 커밋한다.
```

## 오늘 기준 생존 우선순위

반드시 먼저 할 20%:

```text
AGENTS.md / CLAUDE.md 공유
GitHub 연결
한 번에 한 AI만 파일 수정
MCP는 Zapier/GitHub/Supabase 정도만 작게 시작
Gemini/Antigravity도 같은 AGENTS.md를 읽게 만들기
```

나중에 해도 되는 80%:

```text
AI끼리 자동 회의
복잡한 멀티에이전트 서버
자체 MCP 서버 개발
전사형 권한 정책
완전 자동 배포 승인
```
