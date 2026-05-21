<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>QnA List</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
        .msg { background: #d4edda; padding: 10px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2>QnA List</h2>

    <c:if test="${not empty message}">
        <div class="msg">${message}</div>
    </c:if>

    <a href="/qna/add">+ New QnA</a>
    <br><br>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Writer</th>
                <th>Hit</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach var="qna" items="${qnaList}">
                <tr>
                    <td>${qna.qnaId}</td>
                    <td><a href="/qna/detail/${qna.qnaId}">${qna.title}</a></td>
                    <td>${qna.writer}</td>
                    <td>${qna.hit}</td>
                    <td>${qna.regDate}</td>
                </tr>
            </c:forEach>
            <c:if test="${empty qnaList}">
                <tr><td colspan="5">No QnA articles yet.</td></tr>
            </c:if>
        </tbody>
    </table>
</body>
</html>
