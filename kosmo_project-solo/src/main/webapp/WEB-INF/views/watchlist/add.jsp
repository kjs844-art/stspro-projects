<%--
================================================================
[Phase 4] - 파일 (20)번 : watchlist/add.jsp
================================================================

[왜 이 파일이 20번째로 만들어지나?]

WatchlistController의 @GetMapping("/watchlist/add")가
return "watchlist/add" 를 반환하므로 이 JSP가 필요하다.
이 폼을 제출하면 @PostMapping("/watchlist/add")가 처리한다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① 입력 폼 (가장 중요한 부분)
   <form action="/watchlist/add" method="post">
     <input type="text" name="ticker" placeholder="주식 코드 (예: AAPL)">
     <input type="text" name="memo"   placeholder="메모">
     <button type="submit">추가</button>
   </form>

② 폼 필드명과 DTO 필드명 일치 규칙
   name="ticker" → WatchlistDTO의 ticker 필드와 자동 매핑
   name="memo"   → WatchlistDTO의 memo 필드와 자동 매핑
   → 이름이 다르면 매핑이 안 됨! 반드시 일치시킬 것

③ 뒤로가기 링크
   <a href="/watchlist/list">목록으로 돌아가기</a>

----------------------------------------------------------------
[GET vs POST 폼 방식 선택 기준]

method="get"  : 검색 (URL에 파라미터가 보임 ?keyword=...)
method="post" : 저장/수정/삭제 (데이터가 URL에 안 보임, 보안 좋음)
→ 관심종목 추가는 DB 저장이므로 POST 사용

----------------------------------------------------------------
[Phase 4 완료 시 확인 방법]

1. 서버 실행
2. localhost:80/watchlist/list → 빈 목록 화면
3. localhost:80/watchlist/add  → 추가 폼 화면
4. AAPL 입력하고 추가 클릭 → 목록으로 이동, AAPL이 표시됨
5. 삭제 클릭 → 목록에서 사라짐
→ 이 과정이 성공하면 CRUD 완성 = Phase 4 성공!

----------------------------------------------------------------
[다음에 만들 파일]

→ (21)번 MemberDTO.java
   이유: Phase 5에서 회원 기능(로그인, 가입)을 만든다.
   회원 테이블(member)을 설계하고 그 구조를 DTO로 만들어야 한다.
   Phase 4와 완전히 동일한 DTO → Mapper → Service → Controller → JSP 순서.

================================================================
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>관심종목 추가</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
        }

        main {
            max-width: 720px;
            margin: 0 auto;
            padding: 40px 24px;
        }

        a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 700;
        }

        form {
            display: grid;
            gap: 12px;
            margin-top: 24px;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
        }

        label {
            font-weight: 700;
        }

        input {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 16px;
        }

        button {
            padding: 12px 18px;
            border: 0;
            border-radius: 6px;
            background: #2563eb;
            color: #ffffff;
            font-weight: 700;
            cursor: pointer;
        }

        .error {
            margin-top: 16px;
            padding: 12px;
            border: 1px solid #facc15;
            border-radius: 6px;
            background: #fefce8;
        }
    </style>
</head>
<body>
<main>
    <a href="/watchlist/list">← 목록으로</a>
    <h1>관심종목 추가</h1>
    <p>주식 코드와 간단한 메모를 입력하면 WatchlistDTO로 묶여 Controller → Service → Mapper → DB로 이동합니다.</p>

    <c:if test="${error != null}">
        <div class="error">${error}</div>
    </c:if>

    <form action="/watchlist/add" method="post">
        <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">

        <label for="ticker">주식 코드</label>
        <input id="ticker" type="text" name="ticker" placeholder="예: PFE, MRNA, JNJ" required>

        <label for="memo">메모</label>
        <input id="memo" type="text" name="memo" placeholder="예: 임상 3상 결과 확인 필요">

        <button type="submit">추가</button>
    </form>
</main>
</body>
</html>
