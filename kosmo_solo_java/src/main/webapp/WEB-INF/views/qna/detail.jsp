<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>QnA Detail</title>
</head>
<body>
    <h2>QnA Detail</h2>

    <table>
        <tr><th>ID</th><td>${qna.qnaId}</td></tr>
        <tr><th>Title</th><td>${qna.title}</td></tr>
        <tr><th>Writer</th><td>${qna.writer}</td></tr>
        <tr><th>Hit</th><td>${qna.hit}</td></tr>
        <tr><th>Content</th><td><pre>${qna.content}</pre></td></tr>
        <tr><th>Reg Date</th><td>${qna.regDate}</td></tr>
        <tr><th>Mod Date</th><td>${qna.modDate}</td></tr>
    </table>

    <br>
    <a href="/qna/list">Back to List</a>
    <a href="/qna/update/${qna.qnaId}">Edit</a>
    <form action="/qna/delete/${qna.qnaId}" method="post" style="display:inline;">
        <button type="submit" onclick="return confirm('Delete this article?')">Delete</button>
    </form>
</body>
</html>
