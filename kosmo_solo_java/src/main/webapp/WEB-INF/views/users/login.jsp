<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    users/login.jsp - Login Form
    @RequestParam in the Controller reads these input values
    by their "name" attributes.
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <style>
        .msg { background: #f8d7da; padding: 10px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2>Login</h2>

    <c:if test="${not empty message}">
        <div class="msg">${message}</div>
    </c:if>

    <form action="/member/login" method="post">
        <table>
            <tr><th>User ID</th><td><input type="text" name="userId" required></td></tr>
            <tr><th>Password</th><td><input type="password" name="password" required></td></tr>
        </table>
        <br>
        <button type="submit">Login</button>
        <a href="/member/join">Create an account</a>
    </form>
</body>
</html>
