<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    index.jsp - Home page / navigation hub
    JSTL core taglib enables <c:if>, <c:forEach>, ${...} expressions.
    ${loginUser} comes from HomeController -> model.addAttribute()
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Kosmo Solo Java</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        .nav { background: #333; padding: 10px; }
        .nav a { color: white; margin-right: 15px; text-decoration: none; }
        .nav a:hover { text-decoration: underline; }
        .user-info { float: right; color: #ffd700; }
        h1 { color: #333; }
    </style>
</head>
<body>

    <%-- Navigation bar --%>
    <div class="nav">
        <a href="/">Home</a>
        <a href="/notice/list">Notice</a>
        <a href="/qna/list">QnA</a>
        <a href="/board/add">Board Add</a>
        <a href="/board/detail">Board Detail</a>

        <%-- Show login user or login/join links --%>
        <span class="user-info">
            <c:choose>
                <c:when test="${not empty loginUser}">
                    Welcome, ${loginUser.name}! |
                    <a href="/member/mypage" style="color:#ffd700;">MyPage</a>
                    <a href="/member/logout" style="color:#ffd700;">Logout</a>
                </c:when>
                <c:otherwise>
                    <a href="/member/login">Login</a> |
                    <a href="/member/join">Join</a>
                </c:otherwise>
            </c:choose>
        </span>
    </div>

    <h1>Kosmo Solo Java</h1>
    <p>Welcome to the Java learning project with Spring Boot + MyBatis + H2 + JSP.</p>

    <h3>Available Features:</h3>
    <ul>
        <li><a href="/notice/list">Notice Board</a> - Full CRUD with database</li>
        <li><a href="/qna/list">QnA Board</a> - Full CRUD with database</li>
        <li><a href="/member/join">Join</a> - Create a member account</li>
        <li><a href="/member/login">Login</a> - Log in to your account</li>
        <li><a href="/h2-console" target="_blank">H2 Console</a> - View database tables (JDBC URL: jdbc:h2:mem:testdb)</li>
    </ul>

</body>
</html>
