<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Stock Search</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; max-width: 720px; }
a { color: #0b5cad; text-decoration: none; }
label { display: block; margin: 16px 0; }
input { width: 100%; box-sizing: border-box; padding: 10px; margin-top: 6px; }
button { border: 1px solid #0b5cad; background: #0b5cad; color: #fff; padding: 10px 14px; border-radius: 4px; cursor: pointer; }
.hint { color: #666; }
</style>
</head>
<body>
	<p><a href="/">← 홈으로</a></p>
	<h1>주식 검색</h1>
	<p class="hint">티커를 입력하면 Yahoo Finance API에서 기본 정보를 가져옵니다. 예: NVDA, AAPL, MSFT</p>

	<form method="get" action="/stocks/search">
		<label>티커
			<input type="text" name="ticker" value="NVDA" required>
		</label>
		<button type="submit">검색</button>
	</form>
</body>
</html>
