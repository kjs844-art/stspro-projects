# KOSMO_JOE_FIN DB Implementation Status

작성일: 2026-05-17

## 완료된 작업

- Supabase 프로젝트 `supa-DB-tuto` 사용 확정
  - Project ID: `somkqvrvhjnvwqttrnty`
  - 운영용 테이블 생성 완료
  - `SELECT 1` 연결 확인 완료
- Spring Boot DB 프로필 파일 추가
  - `application-local.properties`
  - `application-supabase.properties`
  - `application-neon.properties`
- Supabase SQL 마이그레이션 파일 추가
  - `db/migrations/supabase/001_app_operational_tables.sql`
- Neon SQL 마이그레이션 파일 추가
  - `db/migrations/neon/001_financial_data_tables.sql`
- 무료/유료 권한 DTO 추가
  - `com.joe.fin.member.AccessPolicyDTO`
- 관리용 엑셀 파일 생성 완료
  - `data/spreadsheets/api_data_sources.xlsx`
  - `data/spreadsheets/seed_master_data.xlsx`
- Obsidian 연동 폴더에도 엑셀 파일 복사 완료
  - `G:\My Drive\Obsidian(2Brain)\MainObsidian\KOSMO_JOE_FIN_spreadsheets`

## Supabase 생성 테이블

```text
members
membership_plans
watchlist
saved_reports
```

기본 플랜 데이터:

```text
FREE
PREMIUM
```

## Neon 상태

Neon 프로젝트 `kosmo-joe-fin-data` 생성은 시도했지만, Neon 플러그인 OAuth 재인증이 필요해서 아직 생성되지 않았다.

재인증 후 해야 할 일:

```text
1. Neon 프로젝트 kosmo-joe-fin-data 생성
2. db/migrations/neon/001_financial_data_tables.sql 실행
3. Neon connection string 확보
4. NEON_DB_URL / NEON_DB_USERNAME / NEON_DB_PASSWORD 환경변수 설정
5. Spring 또는 Python에서 SELECT 1 테스트
```

## 검증 결과

Supabase:

```text
SELECT 1 성공
membership_plans row count = 2
```

Gradle:

```text
일반 build/classes 경로는 STS/Eclipse 잠금 때문에 stale output 삭제 실패
임시 build 디렉터리로 classes 실행 성공
```

성공한 검증 방식:

```text
gradlew --init-script C:\tmp\kosmo_joe_fin_gradle_tmp_build.init.gradle classes
```

## 주의

DB 비밀번호와 API Key는 코드나 문서에 직접 저장하지 않는다.

