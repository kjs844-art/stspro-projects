<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    qna/add.jsp - Create a new QnA article
    Input name attributes map to QnaDTO fields for @ModelAttribute.
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Add QnA</title>
</head>
<body>
    <h2>Add QnA</h2>

    <form action="/qna/add" method="post">
        <table>
            <tr>
                <th>Title</th>
                <td><input type="text" name="title" required style="width:400px;"></td>
            </tr>
            <tr>
                <th>Writer</th>
                <td><input type="text" name="writer" required></td>
            </tr>
            <tr>
                <th>Content</th>
                <td><textarea name="content" rows="10" cols="60"></textarea></td>
            </tr>
        </table>
        <br>
        <button type="submit">Save</button>
        <a href="/qna/list">Cancel</a>
    </form>
</body>
</html>
