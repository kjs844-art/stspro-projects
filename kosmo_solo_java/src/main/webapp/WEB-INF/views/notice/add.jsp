<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    notice/add.jsp - Create a new notice
    Form fields must have "name" values matching NoticeDTO fields.
    When submitted, Spring's @ModelAttribute creates a NoticeDTO
    and fills these fields automatically.
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Add Notice</title>
</head>
<body>
    <h2>Add Notice</h2>

    <form action="/notice/add" method="post">
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
        <a href="/notice/list">Cancel</a>
    </form>
</body>
</html>
