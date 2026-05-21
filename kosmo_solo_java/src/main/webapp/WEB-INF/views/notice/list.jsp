<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%-- ============================================================
    JSP: notice/list.jsp
    JSTL taglib: lets us use <c:forEach>, <c:if>, ${...} etc.
    ${noticeList} comes from model.addAttribute("noticeList", ...)
============================================================ --%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Notice List</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .msg { background: #d4edda; padding: 10px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h2>Notice List</h2>

    <%-- Flash message shows after add/update/delete --%>
    <c:if test="${not empty message}">
        <div class="msg">${message}</div>
    </c:if>

    <a href="/notice/add">+ New Notice</a>
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
            <%-- 
                <c:forEach> loops over the list
                var="notice" is the loop variable
                items="${noticeList}" is the collection from Model
            --%>
            <c:forEach var="notice" items="${noticeList}">
                <tr>
                    <td>${notice.noticeId}</td>
                    <td><a href="/notice/detail/${notice.noticeId}">${notice.title}</a></td>
                    <td>${notice.writer}</td>
                    <td>${notice.hit}</td>
                    <td>${notice.regDate}</td>
                </tr>
            </c:forEach>

            <%-- If the list is empty --%>
            <c:if test="${empty noticeList}">
                <tr><td colspan="5">No notices found.</td></tr>
            </c:if>
        </tbody>
    </table>
</body>
</html>
