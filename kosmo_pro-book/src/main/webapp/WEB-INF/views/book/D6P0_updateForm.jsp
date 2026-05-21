<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--
  📖 도서 수정 화면 (D6P0_updateForm.jsp)
  기존에 등록된 책 정보를 수정하는 양식입니다.
--%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>도서 정보 수정</title>
  <style>
    body { font-family: 'Malgun Gothic', sans-serif; padding: 30px; background-color: #f4f7f9; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    h2 { color: #2c3e50; border-bottom: 2px solid #4a90d9; padding-bottom: 10px; margin-bottom: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    input[type="text"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; background-color: #fff; }
    input[readonly] { background-color: #f0f0f0; cursor: not-allowed; }
    .btn-group { margin-top: 25px; text-align: center; }
    .btn { padding: 10px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
    .btn-blue { background: #4a90d9; color: white; }
    .btn-blue:hover { background: #357abd; }
    .btn-gray { background: #95a5a6; color: white; margin-left: 10px; }
    .btn-gray:hover { background: #7f8c8d; }
  </style>
</head>
<body>

  <div class="container">
    <h2>✏️ 도서 정보 수정</h2>
    
    <!-- /book/update 주소로 수정된 데이터를 보냅니다. -->
    <form action="/book/update" method="post">
      
      <!-- 
        ⚠️ 수정할 때는 '어떤 책'을 수정할지 알려주는 id 값이 반드시 필요합니다!
        사용자가 고치면 안 되는 값이므로 hidden(숨김)으로 보냅니다.
      -->
      <input type="hidden" name="id" value="${book.id}">

      <div class="form-group">
        <label>도서 번호</label>
        <input type="text" value="${book.id}" readonly>
      </div>

      <div class="form-group">
        <label for="title">도서 제목</label>
        <!-- ${book.title}: 컨트롤러에서 보낸 기존 제목을 input에 미리 채워줍니다. -->
        <input type="text" id="title" name="title" value="${book.title}" required>
      </div>
      
      <div class="form-group">
        <label for="author">저자</label>
        <input type="text" id="author" name="author" value="${book.author}" required>
      </div>
      
      <div class="form-group">
        <label for="publisher">출판사</label>
        <input type="text" id="publisher" name="publisher" value="${book.publisher}" required>
      </div>

      <div class="btn-group">
        <button type="submit" class="btn btn-blue">수정완료</button>
        <a href="/book/list" class="btn btn-gray">취소</a>
      </div>
    </form>
  </div>

</body>
</html>

