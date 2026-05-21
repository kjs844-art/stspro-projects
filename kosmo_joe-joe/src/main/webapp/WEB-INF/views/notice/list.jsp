<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%--
[출력 흐름]
Controller: model.addAttribute("output", dto)
JSP 공식: ${모델에 담은 이름.멤버변수명}
${output.variable} = dto.getVariable() 값 출력
${output.number} = dto.getNumber() 값 출력
--%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	output 을 출력합니다.
	${output.variable}
	${output.number}
</body>
</html>