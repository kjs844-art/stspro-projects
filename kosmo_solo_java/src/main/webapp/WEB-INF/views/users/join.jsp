<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    users/join.jsp - Member Registration Form
    name="..." values must match MemberDTO field names
    so @ModelAttribute can fill them automatically.
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Join</title>
    <style>
        .msg { background: #d4edda; padding: 10px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2>Member Join</h2>

    <c:if test="${not empty message}">
        <div class="msg">${message}</div>
    </c:if>

    <form action="/member/join" method="post">
        <table>
            <tr><th>User ID</th><td><input type="text" name="userId" required></td></tr>
            <tr><th>Password</th><td><input type="password" name="password" required></td></tr>
            <tr><th>Name</th><td><input type="text" name="name" required></td></tr>
            <tr><th>Email</th><td><input type="email" name="email"></td></tr>
            <tr><th>Phone</th><td><input type="text" name="phone"></td></tr>
        </table>
        <br>
        <button type="submit">Register</button>
        <a href="/member/login">Already have an account?</a>
    </form>
</body>
</html>
