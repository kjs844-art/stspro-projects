<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ETF Search</title>
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
	<h1>ETF 검색</h1>
	<p class="hint">ETF 티커를 입력하면 기본 정보와 주요 구성 종목 예시를 보여줍니다. 예: QQQ, SPY, VOO</p>

	<form method="get" action="/etfs/search">
		<label>ETF 티커
			<input type="text" name="ticker" value="QQQ" required>
		</label>
		<button type="submit">검색</button>
	</form>
</body>
</html>
