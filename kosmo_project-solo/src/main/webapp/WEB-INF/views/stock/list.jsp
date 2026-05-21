<%--
================================================================
[Phase 2] - 파일 (9)번 : stock/list.jsp
================================================================

[왜 이 파일이 9번째로 만들어지나?]

StockController(8번)가 return "stock/list"; 를 반환하므로
이 JSP 파일이 없으면 화면이 뜨지 않는다.
Controller를 만들면 반드시 JSP를 바로 만들어야 한다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① JSP 선언 (맨 위 첫 줄 필수)
   <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

② 검색 폼
   <form action="/stock/list" method="get">
     <input type="text" name="keyword" placeholder="주식 코드 입력 (예: AAPL)">
     <button type="submit">검색</button>
   </form>
   → GET 방식으로 /stock/list?keyword=AAPL 요청을 보냄

③ 주식 데이터 출력 (EL 표현식 사용)
   ${stock.ticker}        → 주식 코드 출력
   ${stock.companyName}   → 회사명 출력
   ${stock.currentPrice}  → 현재가 출력
   ${stock.changePercent} → 등락률 출력

④ null 체크 - stock 데이터가 없을 때 처리
   <c:if test="${stock != null}"> ... </c:if>
   → JSTL 태그 사용 (taglib 선언 필요)

----------------------------------------------------------------
[EL 표현식 ${} 설명]

${stock.ticker} 는 어디서 오나?
→ StockController에서 model.addAttribute("stock", dto) 를 했기 때문
→ "stock"이라는 이름으로 담았으니 ${stock}으로 꺼낸다
→ dto의 getTicker()가 있으니 ${stock.ticker}로 접근 가능
→ DTO에 @Data (Lombok)가 있어야 getter가 자동 생성됨!

----------------------------------------------------------------
[Phase 2 완료 시 확인 방법]

1. 서버 실행
2. localhost:80/stock/list?keyword=AAPL 접속
3. 주식 정보가 화면에 출력되면 Phase 2 성공

----------------------------------------------------------------
[다음에 만들 파일]

→ (10)번 ClinicalDTO.java
   이유: Phase 3에서 임상시험 API를 연동하기 위해
   임상시험 데이터를 담을 DTO가 필요하다.
   Phase 2와 동일한 순서(DTO → Service → Controller → JSP)로 진행.

================================================================
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>BioPulse 주식 레이더</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
        }

        main {
            max-width: 960px;
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
            padding: 14px;
            border-bottom: 1px solid #e5e7eb;
            text-align: left;
        }

        th {
            width: 180px;
            background: #eef2ff;
        }

        .message {
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
    <a href="/">← 홈으로</a>
    <h1>주식 레이더</h1>
    <p>주식 코드를 입력하면 Service가 외부 금융 데이터를 받아 DTO에 담고, Controller가 JSP로 전달합니다.</p>

    <form action="/stock/list" method="get">
        <input type="text" name="keyword" value="${keyword}" placeholder="주식 코드 입력 예: AAPL, PFE, MRNA">
        <button type="submit">검색</button>
    </form>

    <c:if test="${stock != null}">
        <table>
            <tr>
                <th>주식 코드</th>
                <td>${stock.ticker}</td>
            </tr>
            <tr>
                <th>회사명</th>
                <td>${stock.companyName}</td>
            </tr>
            <tr>
                <th>현재가</th>
                <td>${stock.currentPrice}</td>
            </tr>
            <tr>
                <th>등락률</th>
                <td>${stock.changePercent}%</td>
            </tr>
            <tr>
                <th>분류</th>
                <td>${stock.industry}</td>
            </tr>
        </table>

        <c:if test="${stock.message != null}">
            <div class="message">${stock.message}</div>
        </c:if>
    </c:if>
</main>
</body>
</html>
