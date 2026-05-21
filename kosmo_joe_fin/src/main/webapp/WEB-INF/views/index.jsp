<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>KOSMO JOE FIN</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; }
a { color: #0b5cad; text-decoration: none; }
.hero { max-width: 760px; }
.nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }
.button { border: 1px solid #0b5cad; background: #0b5cad; color: #fff; padding: 10px 14px; border-radius: 4px; }
</style>
</head>
<body>
<main class="hero">
	<h1>KOSMO JOE FIN</h1>
	<p>주식, ETF, 뉴스, 금융 데이터를 학습용으로 분석하는 Spring Boot 금융 리서치 프로젝트입니다.</p>
	<div class="nav">
		<a class="button" href="/terminal">글로벌 터미널</a>
		<a class="button" href="/stocks">주식 검색</a>
		<a class="button" href="/etfs">ETF 검색</a>
		<a class="button" href="/members/plans">회원 권한</a>
		<a class="button" href="/watchlist">관심종목</a>
		<a class="button" href="/news?symbol=NVDA">뉴스 메모</a>
		<a href="/h2-console">H2 콘솔</a>
	</div>
</main>
</body>
</html>
