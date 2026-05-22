<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${market.city} Market</title>
<style>
body {
  margin: 0;
  min-height: 100vh;
  background: #070b14;
  color: #e9efff;
  font-family: Arial, sans-serif;
}
.wrap {
  max-width: 920px;
  margin: 0 auto;
  padding: 36px 24px;
}
a { color: #6ad8ff; text-decoration: none; }
.eyebrow {
  color: #8f9bb8;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
h1 {
  margin: 10px 0 10px;
  font-size: 42px;
}
.panel {
  margin-top: 20px;
  border: 1px solid rgba(106, 216, 255, 0.22);
  background: rgba(16, 25, 45, 0.72);
  border-radius: 8px;
  padding: 22px;
}
.grid {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 12px;
}
.label { color: #9aa7c7; }
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
.chip {
  border: 1px solid rgba(106, 216, 255, 0.28);
  border-radius: 999px;
  padding: 7px 11px;
  background: rgba(106, 216, 255, 0.08);
  font-size: 13px;
}
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 22px;
}
.btn {
  border: 1px solid rgba(106, 216, 255, 0.45);
  border-radius: 6px;
  padding: 10px 14px;
  background: rgba(106, 216, 255, 0.12);
}
</style>
</head>
<body>
<main class="wrap">
  <p><a href="/terminal">← 글로벌 터미널로 돌아가기</a></p>
  <div class="eyebrow">${market.country} · ${market.exchange}</div>
  <h1>${market.city} Market</h1>
  <p>${market.summary}</p>

  <section class="panel">
    <div class="grid">
      <div class="label">대표 지수</div>
      <div>${market.primaryIndex}</div>
      <div class="label">Yahoo 심볼</div>
      <div>${market.yahooSymbol}</div>
      <div class="label">거래소</div>
      <div>${market.exchange}</div>
      <div class="label">지역</div>
      <div>${market.city}, ${market.country}</div>
    </div>
  </section>

  <section class="panel">
    <div class="label">터미널에서 연결된 지수</div>
    <div class="chips">
      <c:forEach var="indexName" items="${market.indices}">
        <span class="chip">${indexName}</span>
      </c:forEach>
    </div>
  </section>

  <div class="actions">
    <a class="btn" href="/stocks/search?ticker=${market.yahooSymbol}">대표 지수 데이터 보기</a>
    <a class="btn" href="/news?symbol=${market.yahooSymbol}">관련 뉴스 보기</a>
  </div>
</main>
</body>
</html>
