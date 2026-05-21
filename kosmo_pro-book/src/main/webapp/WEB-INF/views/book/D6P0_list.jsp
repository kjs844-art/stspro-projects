<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%--
  📖 도서 목록 화면 (D6P0_list.jsp)
  이 화면은 DB에서 가져온 모든 책 정보를 표(Table) 형태로 보여줍니다.
--%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>도서 관리 시스템 - 목록</title>
  <style>
    body { font-family: 'Malgun Gothic', sans-serif; padding: 30px; background-color: #f4f7f9; }
    .container { max-width: 1000px; margin: 0 auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #4a90d9; padding-bottom: 15px; margin-bottom: 20px; }
    h2 { color: #2c3e50; margin: 0; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: center; }
    th { background-color: #4a90d9; color: white; }
    tr:hover { background-color: #f9f9f9; }
    .btn { padding: 8px 16px; text-decoration: none; border-radius: 6px; font-weight: bold; transition: 0.3s; display: inline-block; }
    .btn-blue { background: #4a90d9; color: white; }
    .btn-blue:hover { background: #357abd; }
    .btn-green { background: #27ae60; color: white; }
    .btn-green:hover { background: #219150; }
    .btn-red { background: #e74c3c; color: white; }
    .btn-red:hover { background: #c0392b; }
    .user-info { font-size: 0.9em; color: #666; }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h2>📚 도서 관리 시스템</h2>
      
      <div class="user-info">
        <c:choose>
          <c:when test="${not empty sessionScope.member}">
            <span>👤 <b>${sessionScope.member.name}</b>님 (로그인 중)</span>
            <a href="/member/logout" class="btn btn-red" style="margin-left: 10px; font-size: 0.8em; padding: 5px 10px;">로그아웃</a>
          </c:when>
          <c:otherwise>
            <a href="/member/login" class="btn btn-blue" style="font-size: 0.8em; padding: 5px 10px;">로그인</a>
            <a href="/member/join" class="btn" style="background:#bdc3c7; color:white; font-size: 0.8em; padding: 5px 10px;">회원가입</a>
          </c:otherwise>
        </c:choose>
      </div>
    </div>

    <div style="margin-bottom: 15px; text-align: right;">
      <!-- /book/insertForm 주소로 요청을 보냅니다. (컨트롤러의 insertForm() 실행) -->
      <a href="/book/insertForm" class="btn btn-green">➕ 새 도서 등록</a>
    </div>

    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>도서 제목</th>
          <th>저자</th>
          <th>출판사</th>
          <th>관리 메뉴</th>
        </tr>
      </thead>
      <tbody>
        <c:forEach var="book" items="${books}">
          <tr>
            <td>${book.id}</td>
            <td style="text-align: left; padding-left: 20px;">
              <b>${book.title}</b>
            </td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>
              <!-- 수정 버튼: /book/updateForm?id=번호 형태로 요청 -->
              <a href="/book/updateForm?id=${book.id}" class="btn btn-blue" style="font-size: 0.8em;">수정</a>
              <!-- 삭제 버튼: /book/delete?id=번호 형태로 요청 -->
              <a href="/book/delete?id=${book.id}" class="btn btn-red" style="font-size: 0.8em;"
                 onclick="return confirm('이 도서를 목록에서 삭제할까요?')">삭제</a>
            </td>
          </tr>
        </c:forEach>

        <c:if test="${empty books}">
          <tr>
            <td colspan="5" style="padding: 50px; color: #999;">등록된 도서 정보가 없습니다. 📖</td>
          </tr>
        </c:if>
      </tbody>
    </table>
  </div>

</body>
</html>

