<%--
================================================================
[Phase 1] - 파일 (5)번 : index.jsp
================================================================

[왜 이 파일이 5번째로 만들어지나?]

HomeController.java(4번)가 return "index"; 를 반환하면
Spring은 application.properties 설정을 보고
/WEB-INF/views/index.jsp 파일을 찾는다.
이 파일이 없으면 브라우저에 "Whitelabel Error Page" (404)가 뜬다.
Controller를 만들면 반드시 대응하는 JSP를 만들어야 한다.

----------------------------------------------------------------
[이 파일 안에 무슨 코드가 들어가나?]

① JSP 기본 선언 (맨 위 첫 줄에 반드시!)
   <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
   → 이게 없으면 한글이 깨진다

② HTML 구조 (<!DOCTYPE html>, <html>, <head>, <body>)
   → 일반 HTML과 동일

③ BioPulse 대시보드 제목과 메뉴
   → Phase 2~5를 만들면서 메뉴에 링크를 추가할 것
   → /stock/list, /clinical/list, /watchlist/list 링크들

④ ${} 표현식 - 나중에 Model에서 데이터 꺼낼 때 사용
   → Phase 2부터 본격적으로 사용

----------------------------------------------------------------
[Phase 1 완료 시 확인 방법]

1. STS에서 서버 실행
2. 브라우저에서 localhost:80 접속
3. index.jsp 화면이 나오면 Phase 1 성공

----------------------------------------------------------------
[다음에 만들 파일]

→ (6)번 StockDTO.java
   이유: 외부 API에서 받은 주식 데이터를 담을 상자(DTO)를
   먼저 정의해야 Service에서 사용할 수 있다.
   설계 원칙: 데이터 구조(DTO)를 먼저 설계하고, 그 다음 로직(Service)을 짠다.

================================================================
--%>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>BioPulse</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f4f7fb;
            color: #1f2937;
        }

        main {
            max-width: 960px;
            margin: 0 auto;
            padding: 48px 24px;
        }

        h1 {
            margin-bottom: 8px;
            font-size: 32px;
        }

        .menu {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
            margin-top: 28px;
        }

        .menu a {
            display: block;
            padding: 16px;
            border: 1px solid #d8dee9;
            border-radius: 8px;
            background: #ffffff;
            color: #1f2937;
            text-decoration: none;
            font-weight: 700;
        }
    </style>
</head>
<body>
<main>
    <h1>BioPulse - 바이오 제약 주식 레이더</h1>
    <p>바이오/제약 주식 데이터와 임상시험 정보를 한 화면에 모으는 포트폴리오 프로젝트입니다.</p>

    <div class="menu">
        <a href="/dashboard">대시보드</a>
        <a href="/stock/list">주식 레이더</a>
        <a href="/clinical/list">임상시험</a>
        <a href="/watchlist/list">관심종목</a>
        <a href="/users/login">로그인</a>
    </div>
</main>
</body>
</html>
