<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>BioPulse Dashboard</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
        }

        main {
            max-width: 1180px;
            margin: 0 auto;
            padding: 40px 24px;
        }

        a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 700;
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

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
        }

        section {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 18px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
            text-align: left;
            vertical-align: top;
        }

        th {
            background: #eef2ff;
        }

        @media (max-width: 820px) {
            .grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
<main>
    <a href="/">← 홈으로</a>
    <h1>BioPulse 대시보드</h1>
    <p>주가, 임상시험 데이터, 관심종목을 한 화면에 모으는 최종 포트폴리오 화면입니다.</p>

    <form action="/dashboard" method="get">
        <input type="text" name="ticker" value="${ticker}" placeholder="주식 코드 예: PFE, MRNA, JNJ">
        <button type="submit">대시보드 조회</button>
    </form>

    <div class="grid">
        <section>
            <h2>주식 요약</h2>
            <table>
                <tr>
                    <th>코드</th>
                    <td>${stock.ticker}</td>
                </tr>
                <tr>
                    <th>회사</th>
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
            </table>
        </section>

        <section>
            <h2>관심종목</h2>
            <c:if test="${empty watchlist}">
                <p>저장된 관심종목이 없습니다.</p>
            </c:if>
            <c:if test="${not empty watchlist}">
                <table>
                    <c:forEach var="item" items="${watchlist}">
                        <tr>
                            <td><a href="/dashboard?ticker=${item.ticker}">${item.ticker}</a></td>
                            <td>${item.memo}</td>
                        </tr>
                    </c:forEach>
                </table>
            </c:if>
        </section>
    </div>

    <section style="margin-top: 18px;">
        <h2>관련 임상시험</h2>
        <c:if test="${empty trials}">
            <p>관련 임상시험 데이터가 없습니다.</p>
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
    </section>
</main>
</body>
</html>
