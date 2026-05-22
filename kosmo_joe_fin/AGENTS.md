# kosmo_joe_fin Agent Rules

## Project

This is the active STS/Spring Boot finance portfolio project.

```text
C:\Users\USER\Desktop\STSPRO\프로젝트 모음\kosmo_joe_fin
```

Run URL:

```text
http://localhost:18085
```

## Current Stack

- Java 21
- Spring Boot 3.5.x
- Gradle
- JSP
- MyBatis
- H2 local database first
- Supabase/Neon planned for external DB integration

## Collaboration Rules

- Reply in Korean for beginner mentoring.
- Keep steps small and practical.
- Do not overwrite unrelated user/Codex changes.
- Do not commit secrets, API keys, `.env`, seed phrases, or passwords.
- Prefer adding one small working feature at a time.
- Before changing code, inspect the existing Controller -> Service -> Mapper -> JSP pattern.
- If build fails with stale output cleanup on Windows, check for locked Gradle/STS build folders before assuming code is broken.

## Current Architecture Shortcut

```text
Browser/JSP
-> Controller
-> Service
-> Mapper or external API
-> DTO
-> Model/API response
-> JSP/JSON
```

## Priority Features

1. Keep `/stocks`, `/etfs`, `/watchlist`, `/news`, `/shadow-risk`, and `/market` working.
2. Keep `FREE / PREMIUM` behavior visible.
3. Build public-data-first financial/risk features.
4. Use automation webhooks as optional integration points, not core runtime dependencies.
