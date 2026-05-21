<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>News</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; max-width: 840px; }
a { color: #0b5cad; text-decoration: none; }
.news-list { display: grid; gap: 12px; margin-top: 18px; }
.news-card { border: 1px solid #ddd; border-radius: 6px; padding: 14px; background: #fafafa; }
.source { color: #555; font-size: 13px; }
</style>
</head>
<body>
	<p><a href="/">← 홈으로</a></p>
	<h1>${symbol} 뉴스 메모</h1>

	<div class="news-list">
		<c:forEach var="news" items="${newsList}">
			<article class="news-card">
				<h2>${news.title}</h2>
				<div class="source">${news.source}</div>
				<p>${news.summary}</p>
			</article>
		</c:forEach>
	</div>
</body>
</html>
