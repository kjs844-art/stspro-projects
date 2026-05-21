<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    qna/update.jsp - Edit an existing QnA article
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit QnA</title>
</head>
<body>
    <h2>Edit QnA</h2>

    <form action="/qna/update" method="post">
        <input type="hidden" name="qnaId" value="${qna.qnaId}">

        <table>
            <tr>
                <th>Title</th>
                <td><input type="text" name="title" value="${qna.title}" required style="width:400px;"></td>
            </tr>
            <tr>
                <th>Writer</th>
                <td><input type="text" name="writer" value="${qna.writer}" required></td>
            </tr>
            <tr>
                <th>Content</th>
                <td><textarea name="content" rows="10" cols="60">${qna.content}</textarea></td>
            </tr>
        </table>
        <br>
        <button type="submit">Update</button>
        <a href="/qna/list">Cancel</a>
    </form>
</body>
</html>
