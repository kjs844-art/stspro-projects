<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Shadow Risk Index</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; max-width: 960px; }
a { color: #0b5cad; text-decoration: none; }
.panel { border: 1px solid #ddd; border-radius: 6px; padding: 20px; margin-top: 18px; background: #fff; }
.score { font-size: 42px; font-weight: 700; margin: 6px 0; }
.level { display: inline-block; padding: 5px 12px; border-radius: 999px; background: #edf2ff; color: #284c7a; }
.grid { display: grid; grid-template-columns: repeat(4, minmax(120px, 1fr)); gap: 10px; margin-top: 14px; }
.metric { border: 1px solid #e0e6ef; border-radius: 6px; padding: 12px; background: #f8fafc; }
.metric strong { display: block; font-size: 22px; margin-top: 5px; }
.form { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
input { padding: 9px; min-width: 260px; }
button { border: 1px solid #0b5cad; background: #0b5cad; color: #fff; padding: 9px 12px; border-radius: 4px; cursor: pointer; }
.news { display: grid; gap: 10px; margin-top: 12px; }
.card { border: 1px solid #ddd; border-radius: 6px; padding: 14px; background: #fafafa; }
.meta, .notice { color: #666; font-size: 14px; }
</style>
</head>
<body>
	<p><a href="/">← 홈으로</a></p>
	<h1>Shadow Risk Index</h1>
	<p>무료 공개 데이터 위주로 만든 지하경제 영향 지표 MVP입니다.</p>

	<form class="form" method="get" action="/shadow-risk">
		<input type="text" name="keyword" value="${risk.keyword}" placeholder="semiconductor, crypto, bank">
		<button type="submit">분석</button>
	</form>

	<section class="panel">
		<div class="level">${risk.riskLevel}</div>
		<div class="score">${risk.score}</div>
		<div class="meta">검색어: ${risk.keyword} / 데이터: ${risk.dataSource}</div>
		<p>${risk.message}</p>

		<div class="grid">
			<div class="metric">뉴스 수<strong>${risk.articleCount}</strong></div>
			<div class="metric">제재 키워드<strong>${risk.sanctionMentions}</strong></div>
			<div class="metric">사이버 키워드<strong>${risk.cyberMentions}</strong></div>
			<div class="metric">자금세탁/불법 키워드<strong>${risk.launderingMentions}</strong></div>
		</div>
	</section>

	<section class="panel">
		<h2>관련 공개 뉴스 신호</h2>
		<div class="news">
			<c:forEach var="item" items="${risk.news}">
				<article class="card">
					<h3><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a></h3>
					<div class="meta">${item.domain} / ${item.sourceCountry} / ${item.seenDate}</div>
				</article>
			</c:forEach>
		</div>
	</section>

	<p class="notice">
		본 지표는 공개 데이터와 뉴스 키워드를 기반으로 산출한 참고용 리스크 지표이며,
		특정 국가, 기업, 개인의 불법 행위를 단정하지 않습니다.
	</p>
</body>
</html>
