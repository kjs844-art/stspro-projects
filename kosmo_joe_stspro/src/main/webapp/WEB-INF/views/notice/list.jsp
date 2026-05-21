<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> <%-- 생성순서 (11) notice/list.jsp: NoticeController.java 29번째 줄 return "notice/list"로 이동하는 JSP입니다. --%>

<%@ taglib prefix="c" uri="jakarta.tags.core" %> <%-- NoticeController.java 27번째 줄에서 output 이름으로 받은 List<NoticeDTO>를 반복 출력하기 위해 c:forEach 태그를 준비합니다. --%>

<!DOCTYPE html> <%-- 흐름 10-3: HTML5 문서라는 뜻입니다. --%>

<html> <%-- 흐름 10-4: HTML 전체 영역을 시작합니다. --%>

<head> <%-- 흐름 10-5: 화면에는 안 보이는 설정 영역을 시작합니다. --%>

<meta charset="UTF-8"> <%-- 흐름 10-6: 브라우저가 한글을 UTF-8로 읽게 합니다. --%>

<title>notice list</title> <%-- 흐름 10-7: 브라우저 탭 제목입니다. --%>

</head> <%-- 흐름 10-8: head 영역을 닫습니다. --%>

<body> <%-- 흐름 10-9: 화면에 직접 보이는 body 영역을 시작합니다. --%>
<c:forEach items="${output}" var="printout">
${printout.Board_Title}<br>

</c:forEach> <%--반복문  --%>
</body> <%-- 흐름 10-14: body 영역을 닫습니다. --%>

</html> <%-- 흐름 10-15: HTML 전체 영역을 닫습니다. --%>
