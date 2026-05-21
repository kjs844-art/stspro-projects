<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- [학습용 주석 - 2단계: JSP 뷰 생성] -->
<!-- 
  JSP(JavaServer Pages) 파일 상단에는 항상 page 지시어가 들어가야 한글 깨짐을 방지할 수 있습니다. 
  이 파일은 스프링 MVC에서 컨트롤러가 "oopo" 라는 View 이름을 반환할 때 보여질 메인 페이지입니다.
-->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>오징어포차 · Squid Pocha</title>
  
  <!-- [학습용 주석] 외부 웹 폰트를 불러옵니다 -->
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Noto+Serif+KR:wght@300;400;500;600&family=Black+Han+Sans&display=swap" rel="stylesheet">
  
  <!-- [학습용 주석] 이전에 만든 정적 리소스(CSS)를 연결합니다 -->
  <link href="/css/oopo.css" rel="stylesheet">
</head>
<body>

<!-- [학습용 주석] 상단 네비게이션 바 -->
<nav>
  <a href="/oopo" class="nav-brand">Sydney Korean</a>
  <div class="nav-tabs">
    <a href="/oopo" class="tab-btn act-oopo">
      <div class="tab-dot"></div>오징어포차 · Squid Pocha
    </a>
  </div>
  <div class="nav-actions">
    <button class="menu-toggle" onclick="openDrawer()" aria-label="Open category menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- [학습용 주석] 모바일/사이드 메뉴 드로어 -->
<div class="side-backdrop" onclick="closeDrawer()"></div>
<aside class="side-drawer theme-oopo" id="side-drawer">
  <div class="drawer-head">
    <div class="drawer-title" id="drawer-title">SQUID POCHA</div>
    <button class="drawer-close" onclick="closeDrawer()">x</button>
  </div>
  <!-- MVC 페이지 이동 링크들 -->
  <a href="/oopo" class="drawer-link">Home (메인)</a>
  <a href="/oopo/menu" class="drawer-link">Menu (메뉴 보기)</a>
  <a href="/oopo/booking" class="drawer-link">Booking (예약 하기)</a>
</aside>

<div class="page oopo-page active" id="page-oopo">

  <!-- 메인 히어로 섹션 -->
  <section id="hero-oopo">
    <div class="squid-bg"></div>
    <div class="geo-deco">
      <div class="geo geo-circle g1"></div><div class="geo geo-circle g2"></div>
      <div class="geo geo-tri g3"></div><div class="geo geo-sq g4"></div>
    </div>
    <div class="hero-num">456</div>
    <div class="hero-content">
      <p class="hero-eyebrow">시드니 시티 · 헤이마켓 · OPEN TILL LATE</p>
      <h1 class="oopo-title">
        <span class="t-white">SQUID</span><br>
        <span class="t-pink">POCHA</span><br>
      </h1>
      <p class="oopo-sub">오 징 어 포 차 · SQUID POCHA</p>
      <!-- 메뉴 보기 링크: /oopo/menu 매핑으로 이동 -->
      <a href="/oopo/menu" class="hero-cta-pink" style="margin-top: 30px;">메뉴 보기 · View Menu →</a>
      <!-- 예약 하기 링크: /oopo/booking 매핑으로 이동 -->
      <a href="/oopo/booking" class="hero-cta-pink" style="margin-top: 10px; border-color:var(--teal); color:var(--teal);">테이블 예약 · Booking →</a>
    </div>
  </section>

  <!-- 소개 섹션 -->
  <section id="about-oopo">
    <div class="fade-up">
      <p class="sec-label">About · 소개</p>
      <h2 class="sec-title">오징어게임이 살아있는 포차</h2>
      <div class="about-body">
        <p>넷플릭스 오징어게임의 세계관을 담은 시드니 유일의 한국 포차 —<br>
           Sydney's Korean pocha inspired by Squid Game.</p>
      </div>
    </div>
  </section>

  <footer>
    <div class="footer-logo">SQUID POCHA</div>
    <p class="footer-sub">Shop G09, 730–742 George St, Haymarket NSW 2000</p>
  </footer>
</div>

<!-- [학습용 주석] 정적 리소스(JS)를 하단에서 불러옵니다 -->
<script src="/js/oopo.js"></script>
</body>
</html>
