<%--
================================================================
[Phase 3] - 파일 (13)번 : clinical/list.jsp
================================================================

[왜 이 파일이 13번째로 만들어지나?]

ClinicalController가 return "clinical/list"; 를 반환하므로
이 JSP 파일이 반드시 있어야 한다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① JSP 선언 + JSTL taglib 선언 (반드시!)
   <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   → c:forEach, c:if 등의 태그를 사용하기 위한 선언

② 검색 폼
   <form action="/clinical/list" method="get">
     <input type="text" name="keyword" placeholder="질환명 입력 (예: lung cancer)">
     <button type="submit">임상시험 검색</button>
   </form>

③ 임상시험 목록 출력 (핵심!)
   <c:forEach var="trial" items="${trials}">
     <tr>
       <td>${trial.nctId}</td>
       <td>${trial.briefTitle}</td>
       <td>${trial.overallStatus}</td>
       <td>${trial.phase}</td>
     </tr>
   </c:forEach>

   → items="${trials}" : Controller에서 model.addAttribute("trials", ...) 한 것
   → var="trial"       : 목록에서 하나씩 꺼낸 임시 변수 이름
   → ${trial.xxx}      : ClinicalDTO의 getter 호출

④ trials가 비어있을 때 메시지
   <c:if test="${empty trials}">
     <p>검색 결과가 없습니다.</p>
   </c:if>

----------------------------------------------------------------
[Phase 3 완료 시 확인 방법]

1. 서버 실행
2. localhost:80/clinical/list?keyword=cancer 접속
3. 임상시험 목록이 테이블 형태로 나오면 Phase 3 성공

----------------------------------------------------------------
[다음에 만들 파일]

→ (14)번 WatchlistDTO.java
   이유: Phase 4에서 DB를 연동한다.
   DB에 관심종목을 저장/조회하려면 먼저 DB 테이블 구조를
   반영하는 DTO를 설계해야 한다.
   DB 설계(테이블 컬럼) ↔ DTO 필드 가 일치해야 한다.

================================================================
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>BioPulse 임상시험 레이더</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
        }

        main {
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 24px;
        }

        a {
            color: #2563eb;
            text-decoration: none;
        }

        form {
            display: flex;
            gap: 8px;
            margin: 24px 0;
        }

        input {
            min-width: 0;
            flex: 1;
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
            vertical-align: top;
        }

        th {
            background: #eef2ff;
        }
    </style>
</head>
<body>
<main>
    <a href="/">← 홈으로</a>
    <h1>임상시험 레이더</h1>
    <p>질환명을 검색하면 ClinicalTrials.gov 데이터를 Service가 받아오고, JSP가 목록으로 출력합니다.</p>

    <form action="/clinical/list" method="get">
        <input type="text" name="keyword" value="${keyword}" placeholder="질환명 입력 예: cancer, diabetes">
        <button type="submit">검색</button>
    </form>

    <c:if test="${empty trials}">
        <p>검색 결과가 없습니다.</p>
    </c:if>

    <c:if test="${not empty trials}">
        <table>
            <thead>
            <tr>
                <th>NCT ID</th>
                <th>제목</th>
                <th>상태</th>
                <th>단계</th>
                <th>질환</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="trial" items="${trials}">
                <tr>
                    <td>${trial.nctId}</td>
                    <td>${trial.briefTitle}</td>
                    <td>${trial.overallStatus}</td>
                    <td>${trial.phase}</td>
                    <td>${trial.condition}</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </c:if>
</main>
</body>
</html>
