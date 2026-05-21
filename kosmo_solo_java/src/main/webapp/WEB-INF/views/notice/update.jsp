<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    notice/update.jsp - Edit an existing notice
    Pre-fills form fields with ${notice.fieldName} from the DB.
    Hidden field stores noticeId so the update knows which row.
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Notice</title>
</head>
<body>
    <h2>Edit Notice</h2>

    <form action="/notice/update" method="post">
        <%-- Hidden: user doesn't see it, but it's submitted with the form --%>
        <input type="hidden" name="noticeId" value="${notice.noticeId}">

        <table>
            <tr>
                <th>Title</th>
                <td><input type="text" name="title" value="${notice.title}" required style="width:400px;"></td>
            </tr>
            <tr>
                <th>Writer</th>
                <td><input type="text" name="writer" value="${notice.writer}" required></td>
            </tr>
            <tr>
                <th>Content</th>
                <td><textarea name="content" rows="10" cols="60">${notice.content}</textarea></td>
            </tr>
        </table>
        <br>
        <button type="submit">Update</button>
        <a href="/notice/list">Cancel</a>
    </form>
</body>
</html>
