<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Stock Detail</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; max-width: 840px; }
a { color: #0b5cad; text-decoration: none; }
.panel { border: 1px solid #ddd; border-radius: 6px; padding: 20px; margin-top: 18px; }
.grid { display: grid; grid-template-columns: 160px 1fr; gap: 10px; }
.label { color: #555; }
.notice { margin-top: 20px; color: #666; font-size: 14px; }
.news-list { display: grid; gap: 10px; margin-top: 12px; }
.news-card { border: 1px solid #ddd; border-radius: 6px; padding: 14px; background: #fafafa; }
.news-card h3 { margin: 0 0 8px; }
.source { color: #555; font-size: 13px; }
.live { display: inline-block; margin-left: 8px; color: #2e7d32; font-size: 13px; }
.plan-bar { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-top: 14px; }
.plan-bar a, .plan-badge { border: 1px solid #ccd6e0; border-radius: 999px; padding: 6px 12px; background: #f7f9fc; font-size: 14px; }
.plan-badge { color: #315b8a; }
.locked { border: 1px dashed #b8c5d6; border-radius: 6px; padding: 14px; background: #f7f9fc; color: #4b5563; margin-top: 12px; }
</style>
</head>
<body>
	<p><a href="/stocks">← 다시 검색</a> | <a href="/">홈</a></p>
	<h1><span id="ticker">${stock.ticker}</span> 주식 기본 정보 <span class="live" id="live-status">LIVE 준비중</span></h1>
	<div class="plan-bar">
		<span class="plan-badge">현재 권한: ${selectedPlan}</span>
		<a href="/stocks/search?ticker=${stock.ticker}&plan=FREE">FREE로 보기</a>
		<a href="/stocks/search?ticker=${stock.ticker}&plan=PREMIUM">PREMIUM으로 보기</a>
	</div>

	<div class="panel">
		<div class="grid">
			<div class="label">회사명</div>
			<div id="company-name">${stock.companyName}</div>
			<div class="label">현재가</div>
			<div id="current-price">${stock.currentPrice}</div>
			<div class="label">변동률</div>
			<div id="change-percent">${stock.changePercent}</div>
			<div class="label">분류</div>
			<div id="industry">${stock.industry}</div>
			<div class="label">갱신시각</div>
			<div id="updated-at">초기 렌더링</div>
		</div>
	</div>

	<form method="post" action="/watchlist">
		<input type="hidden" name="symbol" value="${stock.ticker}">
		<input type="hidden" name="assetType" value="STOCK">
		<input type="hidden" name="memo" value="${stock.companyName}">
		<input type="hidden" name="redirectTo" value="/stocks/search?ticker=${stock.ticker}&amp;plan=${selectedPlan}">
		<button type="submit">관심종목 저장</button>
	</form>

	<div class="panel">
		<h2>관련 뉴스 메모</h2>
		<div class="news-list">
			<c:forEach var="news" items="${newsList}">
				<article class="news-card">
					<h3>${news.title}</h3>
					<div class="source">${news.source}</div>
					<p>${news.summary}</p>
				</article>
			</c:forEach>
		</div>
		<c:if test="${!accessPolicy.premium}">
			<div class="locked">FREE 화면에서는 뉴스 ${accessPolicy.newsLimit}개까지만 보여줍니다. PREMIUM은 전체 뉴스와 심화 분석을 보여주는 구조로 확장됩니다.</div>
		</c:if>
	</div>

	<p class="notice">이 화면은 학습용 예시이며 투자 조언이 아닙니다.</p>

	<script>
		const ticker = "${stock.ticker}";

		function setText(id, value) {
			document.getElementById(id).textContent = value == null ? "" : value;
		}

		async function refreshStock() {
			try {
				const response = await fetch("/api/stocks/" + encodeURIComponent(ticker));
				if (!response.ok) {
					throw new Error("HTTP " + response.status);
				}
				const data = await response.json();
				setText("ticker", data.ticker);
				setText("company-name", data.companyName);
				setText("current-price", data.currentPrice);
				setText("change-percent", data.changePercent);
				setText("industry", data.industry);
				setText("updated-at", data.updatedAt);
				setText("live-status", "LIVE 갱신됨");
			} catch (error) {
				setText("live-status", "LIVE 연결 확인 필요");
			}
		}

		refreshStock();
		setInterval(refreshStock, 30000);
	</script>
</body>
</html>
