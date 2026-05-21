<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Watchlist</title>
<style>
body { font-family: Arial, sans-serif; margin: 32px; color: #222; }
a { color: #0b5cad; text-decoration: none; }
.form { display: grid; grid-template-columns: 1fr 160px 2fr auto; gap: 8px; align-items: end; margin: 18px 0; }
label { display: grid; gap: 5px; font-size: 13px; }
input, select { padding: 9px; box-sizing: border-box; }
button { border: 1px solid #0b5cad; background: #0b5cad; color: #fff; padding: 9px 12px; border-radius: 4px; cursor: pointer; }
table { width: 100%; border-collapse: collapse; margin-top: 18px; }
th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
th { background: #f3f5f7; }
.danger { border-color: #c62828; background: #fff; color: #c62828; }
</style>
</head>
<body>
	<p><a href="/">← 홈으로</a></p>
	<h1>관심종목</h1>

	<form class="form" method="post" action="/watchlist">
		<label>심볼
			<input type="text" name="symbol" placeholder="NVDA" required>
		</label>
		<label>타입
			<select name="assetType">
				<option value="STOCK">STOCK</option>
				<option value="ETF">ETF</option>
			</select>
		</label>
		<label>메모
			<input type="text" name="memo" placeholder="왜 저장했는지 짧게 기록">
		</label>
		<button type="submit">저장</button>
	</form>

	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>심볼</th>
				<th>타입</th>
				<th>메모</th>
				<th>저장일</th>
				<th>삭제</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="item" items="${watchlist}">
				<tr>
					<td>${item.watchlistId}</td>
					<td>${item.symbol}</td>
					<td>${item.assetType}</td>
					<td>${item.memo}</td>
					<td>${item.createdAt}</td>
					<td>
						<form method="post" action="/watchlist/delete">
							<input type="hidden" name="watchlistId" value="${item.watchlistId}">
							<button class="danger" type="submit">삭제</button>
						</form>
					</td>
				</tr>
			</c:forEach>
			<c:if test="${empty watchlist}">
				<tr>
					<td colspan="6">저장된 관심종목이 없습니다.</td>
				</tr>
			</c:if>
		</tbody>
	</table>
</body>
</html>
