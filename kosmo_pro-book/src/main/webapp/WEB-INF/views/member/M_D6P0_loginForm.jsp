<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인</title>
<style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f9; }
    .login-container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 300px; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
    .form-group input[type="text"], .form-group input[type="password"] { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-bottom: 10px; }
    button:hover { background-color: #0056b3; }
    .join-btn { background-color: #6c757d; }
    .join-btn:hover { background-color: #5a6268; }
    .remember-container { display: flex; align-items: center; margin-bottom: 15px; font-size: 14px; }
    .remember-container input { margin-right: 5px; }
</style>
</head>
<body>

<%
    // 브라우저가 보낸 쿠키들을 확인해서 "rememberId" 쿠키가 있는지 찾기
    String savedId = "";
    boolean isChecked = false;
    Cookie[] cookies = request.getCookies();
    if(cookies != null) {
        for(Cookie c : cookies) {
            if(c.getName().equals("rememberId")) {
                savedId = c.getValue();
                isChecked = true;
                break;
            }
        }
    }
%>

<div class="login-container">
    <h2 style="text-align: center; color: #333;">로그인</h2>
    <form action="/member/login" method="post">
        <div class="form-group">
            <label for="username">아이디</label>
            <!-- 쿠키에 저장된 아이디가 있으면 value에 넣어줌 -->
            <input type="text" id="username" name="username" value="<%= savedId %>" required>
        </div>
        <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password" required>
        </div>
        
        <div class="remember-container">
            <!-- 쿠키가 있었으면 체크박스 체크된 상태로 유지 -->
            <input type="checkbox" id="rememberId" name="rememberId" <%= isChecked ? "checked" : "" %>>
            <label for="rememberId" style="margin-bottom: 0; font-weight: normal;">아이디 저장 (쿠키 사용)</label>
        </div>

        <button type="submit">로그인</button>
    </form>
    
    <button class="join-btn" onclick="location.href='/member/join'">회원가입</button>
    
    <div style="text-align: center; margin-top: 15px;">
        <a href="/book/list">목록으로</a>
    </div>
</div>

</body>
</html>
