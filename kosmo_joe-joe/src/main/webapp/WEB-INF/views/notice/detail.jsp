<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%--
[detail 출력 흐름]
/notice/detail -> NoticeController.detail() -> NoticeService.detail() -> Model -> JSP 출력
--%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	detail 을 출력합니다.
	${output.variable}
	${output.number}
</body>
</html>