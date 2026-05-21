<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> <%-- 생성순서 (12) notice/detail.jsp: NoticeController.java 49번째 줄 return "notice/detail"로 이동하는 JSP입니다. --%>

<!DOCTYPE html> <%-- 흐름 11-2: HTML5 문서라는 뜻입니다. --%>

<html> <%-- 흐름 11-3: HTML 전체 영역을 시작합니다. --%>

<head> <%-- 흐름 11-4: 화면에는 안 보이는 설정 영역을 시작합니다. --%>

<meta charset="UTF-8"> <%-- 흐름 11-5: 브라우저가 한글을 UTF-8로 읽게 합니다. --%>

<title>notice detail</title> <%-- 흐름 11-6: 브라우저 탭 제목입니다. --%>

</head> <%-- 흐름 11-7: head 영역을 닫습니다. --%>

<body> <%-- 흐름 11-8: 화면에 직접 보이는 body 영역을 시작합니다. --%>

sdgsadag <%-- NoticeController.java 41번째 줄 /notice/detail 요청이 들어오면 43번째 줄 detail(Model model) 메서드가 실행되어 이 JSP로 옵니다. --%>

${input.variable} <%-- NoticeController.java 47번째 줄 input 이름으로 받은 NoticeDTO에서 NoticeDTO.java 13번째 줄 String variable 값을 꺼내 화면에 표현합니다. --%>

${input.number} <%-- NoticeController.java 47번째 줄 input 이름으로 받은 NoticeDTO에서 NoticeDTO.java 15번째 줄 Integer number 값을 꺼내 화면에 표현합니다. --%>

</body> <%-- 흐름 11-12: body 영역을 닫습니다. --%>

</html> <%-- 흐름 11-13: HTML 전체 영역을 닫습니다. --%>
