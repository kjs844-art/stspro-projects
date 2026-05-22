# Shared MCP Map

이 파일은 여러 AI 도구가 같은 외부 도구를 보도록 맞추는 지도입니다.

## 추천 시작 세트

```text
GitHub  = 코드/이슈/PR 협업
Zapier  = 외부 앱 자동화
Supabase = 사용자/운영 DB
Neon    = 금융/분석 DB
```

## 도구별 설정 파일

```text
Codex       : C:\Users\USER\.codex\config.toml
Claude Code : 프로젝트 .mcp.json 또는 claude mcp add
OpenCode    : opencode.jsonc
Gemini CLI  : C:\Users\USER\.gemini\settings.json
Antigravity : C:\Users\USER\.gemini\antigravity\mcp_config.json
```

## 프로젝트에 보관하는 파일

```text
docs/claude-mcp.example.json
docs/opencode.example.jsonc
docs/gemini-settings.example.json
docs/antigravity-mcp.example.json
```

## 프로젝트에 보관하지 않는 파일

```text
.mcp.json
opencode.jsonc
.gemini/settings.json
.antigravity/*
.env
.env.*
secrets/*
```

이 파일들은 실제 토큰/비밀키가 들어갈 수 있어서 `.gitignore`에 넣었다.
