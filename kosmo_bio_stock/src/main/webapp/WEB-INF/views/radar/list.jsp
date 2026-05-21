<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>Bio Stock Radar</title>
<style>
	body { font-family: Arial, sans-serif; margin: 32px; color: #1f2937; }
	h1 { margin-bottom: 8px; }
	form { margin: 24px 0; }
	input { padding: 10px; width: 260px; }
	button { padding: 10px 14px; cursor: pointer; }
	table { border-collapse: collapse; width: 100%; margin-top: 16px; }
	th, td { border: 1px solid #d1d5db; padding: 10px; text-align: left; vertical-align: top; }
	th { background: #f3f4f6; }
	.score { font-weight: bold; color: #047857; }
</style>
</head>
<body>
	<h1>Bio Stock Radar</h1>
	<p>바이오/주식 키워드 신호를 모아서 보여주는 연습용 MVP입니다.</p>

	<form action="/radar/list" method="get"> <%-- 흐름 37: 검색 버튼을 누르면 keyword 값을 /radar/list Controller로 GET 방식 전송합니다. --%>
		<input type="text" name="keyword" value="${keyword}" placeholder="예: FDA, 반도체, 비만치료제"> <%-- 흐름 38: name="keyword"가 Controller의 String keyword 매개변수로 들어갑니다. --%>
		<button type="submit">검색</button> <%-- 흐름 39: 버튼 클릭 시 form 안의 keyword 값을 Controller로 보냅니다. --%>
	</form>

	<p>
		검색어: <strong><c:out value="${empty keyword ? '전체' : keyword}" /></strong> /
		결과: <strong>${resultCount}</strong>건
	</p>

	<table>
		<thead>
			<tr>
				<th>분야</th>
				<th>키워드</th>
				<th>제목</th>
				<th>신호</th>
				<th>점수</th>
				<th>이유</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach var="signal" items="${signals}"> <%-- 흐름 40: Controller가 Model에 담은 signals 목록을 signal 변수로 하나씩 꺼냅니다. --%>
				<tr>
					<td>${signal.category}</td> <%-- 흐름 41: BioSignalDTO의 getCategory() 결과를 출력합니다. --%>
					<td>${signal.keyword}</td> <%-- 흐름 42: BioSignalDTO의 getKeyword() 결과를 출력합니다. --%>
					<td>${signal.title}<br><small>${signal.source}</small></td> <%-- 흐름 43: 제목과 출처를 같은 칸에 출력합니다. --%>
					<td>${signal.signalType}</td> <%-- 흐름 44: 기회/주의/리스크 같은 신호 타입을 출력합니다. --%>
					<td class="score">${signal.score}</td> <%-- 흐름 45: 점수 데이터를 강조해서 출력합니다. --%>
					<td>${signal.reason}</td> <%-- 흐름 46: Service가 DTO에 담아준 이유 문장을 출력합니다. --%>
				</tr>
			</c:forEach>

			<c:if test="${resultCount == 0}">
				<tr>
					<td colspan="6">검색 결과가 없습니다. FDA, 반도체, 비만치료제 같은 키워드로 다시 검색해보세요.</td>
				</tr>
			</c:if>
		</tbody>
	</table>
</body>
</html>
