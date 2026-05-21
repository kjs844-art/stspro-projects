<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- [학습용 주석 - 2단계: JSP 화면 분리] 이 파일은 /oopo/menu 요청 시 보여질 메뉴 전용 페이지입니다. -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>메뉴 · Squid Pocha</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Noto+Serif+KR:wght@300;400;500;600&family=Black+Han+Sans&display=swap" rel="stylesheet">
  <link href="/css/oopo.css" rel="stylesheet">
</head>
<body>

<nav>
  <a href="/oopo" class="nav-brand">Sydney Korean</a>
  <div class="nav-tabs">
    <a href="/oopo" class="tab-btn act-oopo"><div class="tab-dot"></div>오징어포차</a>
  </div>
  <div class="nav-actions">
    <button class="menu-toggle" onclick="openDrawer()"><span></span><span></span><span></span></button>
  </div>
</nav>

<div class="side-backdrop" onclick="closeDrawer()"></div>
<aside class="side-drawer theme-oopo" id="side-drawer">
  <div class="drawer-head"><div class="drawer-title">SQUID POCHA</div><button class="drawer-close" onclick="closeDrawer()">x</button></div>
  <a href="/oopo" class="drawer-link">Home (메인)</a>
  <a href="/oopo/menu" class="drawer-link" style="color:var(--pink);">Menu (메뉴 보기)</a>
  <a href="/oopo/booking" class="drawer-link">Booking (예약 하기)</a>
</aside>

<div class="page oopo-page active" style="padding-top: 60px;">
  <section class="menu-sec">
    <div class="menu-hd fade-up">
      <p class="sec-label">Menu · 메뉴</p>
      <h2 class="sec-title">포차의 맛 · Taste of Pocha</h2>
    </div>
    <div class="divider"><div class="deco-shapes"><div class="ds-c"></div><div class="ds-t"></div><div class="ds-s"></div></div></div>

    <div class="fade-up">
      <div class="cat-hd"><span class="cat-label">메인 <small>Mains</small></span></div>
      <div class="menu-list">
        <!-- DB연동 없이 정적인 화면으로 보여주는 메뉴 목록 -->
        <div class="menu-row"><div class="menu-row-left"><div class="mr-kr">삼겹살세트</div><div class="mr-en">Grilled Pork Belly Set</div></div><div class="mr-price">$43.9</div></div>
        <div class="menu-row"><div class="menu-row-left"><div class="mr-kr">오포쪽발</div><div class="mr-en">Braised Pork Hock (Jokbal)</div></div><div class="mr-price">$42.9</div></div>
        <div class="menu-row"><div class="menu-row-left"><div class="mr-kr">오포 떡볶이</div><div class="mr-en">Oopo Tteokbokki</div></div><div class="mr-price">$42.9</div></div>
        <div class="menu-row"><div class="menu-row-left"><div class="mr-kr">바지락 파스타</div><div class="mr-en">Clam Pasta</div></div><div class="mr-price">$35.9</div></div>
      </div>
    </div>
    
    <div class="fade-up" style="margin-top: 40px;">
      <a href="/oopo/booking" class="hero-cta-pink">메뉴가 마음에 드신다면? 예약하기 →</a>
    </div>
  </section>
  
  <footer>
    <div class="footer-logo">SQUID POCHA</div>
  </footer>
</div>

<script src="/js/oopo.js"></script>
</body>
</html>
