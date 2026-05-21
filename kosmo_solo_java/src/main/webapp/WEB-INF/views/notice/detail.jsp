<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Notice Detail</title>
</head>
<body>
    <h2>Notice Detail</h2>

    <%-- 
        ${notice} comes from model.addAttribute("notice", notice)
        Each ${notice.fieldName} calls the getter method automatically
    --%>
    <table>
        <tr><th>ID</th><td>${notice.noticeId}</td></tr>
        <tr><th>Title</th><td>${notice.title}</td></tr>
        <tr><th>Writer</th><td>${notice.writer}</td></tr>
        <tr><th>Hit</th><td>${notice.hit}</td></tr>
        <tr><th>Content</th><td><pre>${notice.content}</pre></td></tr>
        <tr><th>Reg Date</th><td>${notice.regDate}</td></tr>
        <tr><th>Mod Date</th><td>${notice.modDate}</td></tr>
    </table>

    <br>
    <a href="/notice/list">Back to List</a>
    <a href="/notice/update/${notice.noticeId}">Edit</a>

    <%-- Delete form: POST because deleting modifies data --%>
    <form action="/notice/delete/${notice.noticeId}" method="post" style="display:inline;">
        <button type="submit" onclick="return confirm('Delete this notice?')">Delete</button>
    </form>
</body>
</html>
