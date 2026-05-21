<%--
================================================================
[Phase 4] - 파일 (19)번 : watchlist/list.jsp
================================================================

[왜 이 파일이 19번째로 만들어지나?]

WatchlistController의 @GetMapping("/watchlist/list")가
return "watchlist/list" 를 반환하므로 이 JSP가 필요하다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① JSP 선언 + JSTL taglib

② "추가하기" 버튼 → /watchlist/add 링크

③ DB에서 가져온 목록 출력
   <c:forEach var="item" items="${list}">
     <tr>
       <td>${item.id}</td>
       <td>${item.ticker}</td>
       <td>${item.memo}</td>
       <td>${item.regDate}</td>
       <td>
         <form action="/watchlist/delete" method="post">
           <input type="hidden" name="id" value="${item.id}">
           <button type="submit">삭제</button>
         </form>
       </td>
     </tr>
   </c:forEach>

④ <input type="hidden"> 설명
   → 화면에는 보이지 않지만 POST 요청에 값을 함께 전송
   → 삭제할 항목의 id를 서버에 전달하는 용도

----------------------------------------------------------------
[Phase 3 JSP vs Phase 4 JSP 차이]

Phase 3 list.jsp: 데이터 출력만 (읽기 전용)
Phase 4 list.jsp: 출력 + 삭제 버튼 (읽기 + 삭제 = CRUD 중 RD)

================================================================
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>BioPulse 관심종목</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
        }

        main {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 24px;
        }

        a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 700;
        }

        .actions {
            display: flex;
            gap: 14px;
            margin: 20px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
        }

        th,
        td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            text-align: left;
        }

        th {
            background: #eef2ff;
        }

        button {
            padding: 8px 12px;
            border: 0;
            border-radius: 6px;
            background: #dc2626;
            color: #ffffff;
            cursor: pointer;
        }
    </style>
</head>
<body>
<main>
    <a href="/">← 홈으로</a>
    <h1>관심종목</h1>
    <p>DB에 저장한 바이오/제약 관심 종목을 확인하는 화면입니다.</p>

    <div class="actions">
        <a href="/watchlist/add">+ 관심종목 추가</a>
        <a href="/stock/list">주식 검색으로 이동</a>
    </div>

    <c:if test="${empty list}">
        <p>아직 저장된 관심종목이 없습니다.</p>
    </c:if>

    <c:if test="${not empty list}">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>주식 코드</th>
                <th>메모</th>
                <th>등록일</th>
                <th>삭제</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="item" items="${list}">
                <tr>
                    <td>${item.id}</td>
                    <td><a href="/stock/list?keyword=${item.ticker}">${item.ticker}</a></td>
                    <td>${item.memo}</td>
                    <td>${item.regDate}</td>
                    <td>
                        <form method="post" action="/watchlist/delete">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
                            <input type="hidden" name="id" value="${item.id}">
                            <button type="submit">삭제</button>
                        </form>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </c:if>
</main>
</body>
</html>
