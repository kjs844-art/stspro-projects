<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!-- [학습용 주석 - 2단계: JSP 화면 분리 및 CRUD Form 연동] -->
<!-- 
  JSTL <c:forEach> 등을 사용해 백엔드에서 넘겨준 예약 목록(reservations)을 화면에 출력합니다.
-->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>예약 · Squid Pocha</title>
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
  <a href="/oopo/menu" class="drawer-link">Menu (메뉴 보기)</a>
  <a href="/oopo/booking" class="drawer-link" style="color:var(--pink);">Booking (예약 하기)</a>
</aside>

<div class="page oopo-page active" style="padding-top: 60px;">
  <section class="info-sec" style="min-height: 100vh;">
    <div class="info-hd fade-up">
      <p class="sec-label">Reservation</p>
      <h2 class="sec-title">테이블 예약</h2>
    </div>
    <div class="divider"><div class="deco-shapes"><div class="ds-c"></div><div class="ds-t"></div><div class="ds-s"></div></div></div>

    <!-- [학습용 주석] 예약 폼: action="/oopo/booking" method="POST" 로 전송합니다. -->
    <div class="fade-up">
      <div class="booking-form">
        <form action="/oopo/booking" method="POST">
          <div class="form-group">
            <label for="name">이름 (Name)</label>
            <input type="text" id="name" name="name" required placeholder="예: 홍길동">
          </div>
          <div class="form-group">
            <label for="phone">연락처 (Phone)</label>
            <input type="text" id="phone" name="phone" required placeholder="예: 0412 345 678">
          </div>
          <div class="form-group">
            <label for="guests">인원 수 (Guests)</label>
            <input type="number" id="guests" name="guests" min="1" max="20" required value="2">
          </div>
          <div class="form-group">
            <label for="bookDate">예약 날짜 (Date)</label>
            <input type="date" id="bookDate" name="bookDate" required>
          </div>
          <div class="form-group">
            <label for="bookTime">예약 시간 (Time)</label>
            <select id="bookTime" name="bookTime" required>
              <option value="18:00">오후 6:00</option>
              <option value="19:00">오후 7:00</option>
              <option value="20:00">오후 8:00</option>
              <option value="21:00">오후 9:00</option>
              <option value="22:00">오후 10:00</option>
            </select>
          </div>
          <button type="submit" class="btn-submit">예약 접수하기 · Book Table</button>
        </form>
      </div>
    </div>
    
    <!-- [학습용 주석] 예약 목록 출력 영역 -->
    <div class="fade-up" style="max-width: 800px; margin: 60px auto 0;">
      <h3 style="color:var(--pink); text-align:center; font-family:'Cormorant Garamond', serif;">Recent Bookings (최근 예약 현황)</h3>
      <table class="booking-list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <c:forEach var="res" items="${reservations}">
            <tr>
              <td>${res.id}</td>
              <td>${res.name}</td>
              <td>${res.phone}</td>
              <td>${res.guests}명</td>
              <td>${res.bookDate}</td>
              <td>${res.bookTime}</td>
              <td>
                <!-- 삭제 처리 폼 (학습용 CRUD Delete) -->
                <form action="/oopo/booking/delete" method="POST" style="margin:0;">
                  <input type="hidden" name="id" value="${res.id}">
                  <button type="submit" style="background:transparent; border:1px solid rgba(255,255,255,0.2); color:var(--white); cursor:pointer; padding:4px 8px; font-size:0.7rem;">취소</button>
                </form>
              </td>
            </tr>
          </c:forEach>
          <c:if test="${empty reservations}">
            <tr>
              <td colspan="7" style="text-align:center; padding: 20px;">아직 예약 내역이 없습니다.</td>
            </tr>
          </c:if>
        </tbody>
      </table>
    </div>

  </section>
  
  <footer>
    <div class="footer-logo">SQUID POCHA</div>
  </footer>
</div>

<script src="/js/oopo.js"></script>
</body>
</html>
