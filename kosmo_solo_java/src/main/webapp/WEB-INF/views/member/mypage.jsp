<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    member/mypage.jsp - Shows the logged-in user's profile
    ${member} comes from model.addAttribute("member", member)
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h2>My Page</h2>

    <table>
        <tr><th>ID</th><td>${member.userId}</td></tr>
        <tr><th>Name</th><td>${member.name}</td></tr>
        <tr><th>Email</th><td>${member.email}</td></tr>
        <tr><th>Phone</th><td>${member.phone}</td></tr>
        <tr><th>Role</th><td>${member.role}</td></tr>
        <tr><th>Registered</th><td>${member.regDate}</td></tr>
    </table>

    <br>
    <a href="/">Home</a>
    <a href="/member/logout">Logout</a>
</body>
</html>
