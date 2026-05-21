<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--
  📖 도서 등록 화면 (D6P0_insertForm.jsp)
  사용자가 새로운 책 정보를 입력하는 양식(Form)입니다.
--%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>도서 등록</title>
  <style>
    body { font-family: 'Malgun Gothic', sans-serif; padding: 30px; background-color: #f4f7f9; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    h2 { color: #2c3e50; border-bottom: 2px solid #27ae60; padding-bottom: 10px; margin-bottom: 20px; }
    .form-group { margin-bottom: 15px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
    input[type="text"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
    .btn-group { margin-top: 25px; text-align: center; }
    .btn { padding: 10px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
    .btn-green { background: #27ae60; color: white; }
    .btn-green:hover { background: #219150; }
    .btn-gray { background: #95a5a6; color: white; margin-left: 10px; }
    .btn-gray:hover { background: #7f8c8d; }
  </style>
</head>
<body>

  <div class="container">
    <h2>➕ 새 도서 등록</h2>
    
    <!-- 
      action="/book/insert" : 제출 버튼을 누르면 이 주소로 데이터를 보냅니다.
      method="post" : 데이터가 주소창에 보이지 않게 숨겨서 보냅니다.
    -->
    <form action="/book/insert" method="post">
      <div class="form-group">
        <label for="title">도서 제목</label>
        <!-- name="title": D1P2_BookDTO의 title 필드와 이름이 같아야 자동으로 값이 담깁니다! -->
        <input type="text" id="title" name="title" placeholder="제목을 입력하세요" required>
      </div>
      
      <div class="form-group">
        <label for="author">저자</label>
        <input type="text" id="author" name="author" placeholder="저자 이름을 입력하세요" required>
      </div>
      
      <div class="form-group">
        <label for="publisher">출판사</label>
        <input type="text" id="publisher" name="publisher" placeholder="출판사 이름을 입력하세요" required>
      </div>

      <div class="btn-group">
        <button type="submit" class="btn btn-green">등록하기</button>
        <a href="/book/list" class="btn btn-gray">취소</a>
      </div>
    </form>
  </div>

</body>
</html>

