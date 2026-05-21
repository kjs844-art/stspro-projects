<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ETF Detail</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; max-width: 840px; }
a { color: #0b5cad; text-decoration: none; }
.panel { border: 1px solid #ddd; border-radius: 6px; padding: 20px; margin-top: 18px; }
.grid { display: grid; grid-template-columns: 160px 1fr; gap: 10px; }
.label { color: #555; }
li { margin: 6px 0; }
.notice { margin-top: 20px; color: #666; font-size: 14px; }
.plan-bar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 14px; }
.plan-bar a, .plan-badge { border: 1px solid #ccd6e0; border-radius: 999px; padding: 6px 12px; background: #f7f9fc; font-size: 14px; }
.plan-badge { color: #315b8a; }
.locked { border: 1px dashed #b8c5d6; border-radius: 6px; padding: 14px; background: #f7f9fc; color: #4b5563; margin-top: 12px; }
</style>
</head>
<body>
	<p><a href="/etfs">← 다시 검색</a> | <a href="/">홈</a></p>
	<h1>${etf.ticker} ETF 기본 정보</h1>
	<div class="plan-bar">
		<span class="plan-badge">현재 권한: ${selectedPlan}</span>
		<a href="/etfs/search?ticker=${etf.ticker}&plan=FREE">FREE로 보기</a>
		<a href="/etfs/search?ticker=${etf.ticker}&plan=PREMIUM">PREMIUM으로 보기</a>
	</div>

	<div class="panel">
		<div class="grid">
			<div class="label">ETF명</div>
			<div>${etf.name}</div>
			<div class="label">카테고리</div>
			<div>${etf.category}</div>
			<div class="label">보수율</div>
			<div>${etf.expenseRatio}%</div>
			<div class="label">권한 정책</div>
			<div>${etf.accessLevel}</div>
		</div>
	</div>

	<div class="panel">
		<h2>주요 구성 종목</h2>
		<ul>
			<c:forEach var="holding" items="${etf.topHoldings}">
				<li>${holding}</li>
			</c:forEach>
		</ul>
		<c:if test="${!accessPolicy.premium}">
			<div class="locked">FREE 화면에서는 구성 종목 ${accessPolicy.etfHoldingLimit}개까지만 보여줍니다. PREMIUM은 전체 구성 종목과 심화 리포트까지 보여주는 구조로 확장됩니다.</div>
		</c:if>
	</div>

	<form method="post" action="/watchlist">
		<input type="hidden" name="symbol" value="${etf.ticker}">
		<input type="hidden" name="assetType" value="ETF">
		<input type="hidden" name="memo" value="${etf.name}">
		<input type="hidden" name="redirectTo" value="/etfs/search?ticker=${etf.ticker}&amp;plan=${selectedPlan}">
		<button type="submit">관심종목 저장</button>
	</form>

	<p class="notice">이 화면은 학습용 예시이며 투자 조언이 아닙니다.</p>
</body>
</html>
