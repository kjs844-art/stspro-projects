<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- [EXPLAIN-CODE 008] 예약 폼의 name 값은 ReservationDTO 필드명과 같아야 자동으로 데이터가 들어갑니다. -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title><spring:message code="booking.title" /></title>
    <link rel="stylesheet" href="/css/eastwood888.css">
</head>
<body>
    <nav class="nav">
        <a href="/" class="brand">888 GOGI</a>
        <div class="links">
            <a href="/"><spring:message code="nav.home" /></a>
            <a href="/menu"><spring:message code="nav.menu" /></a>
            <a href="/booking"><spring:message code="nav.booking" /></a>
        </div>
        <div class="lang-switch">
            <a href="?lang=ko"><spring:message code="lang.ko" /></a>
            <a href="?lang=en"><spring:message code="lang.en" /></a>
            <a href="?lang=fr"><spring:message code="lang.fr" /></a>
            <a href="?lang=zh_CN"><spring:message code="lang.zhCN" /></a>
            <a href="?lang=zh_TW"><spring:message code="lang.zhTW" /></a>
            <a href="?lang=ja"><spring:message code="lang.ja" /></a>
            <a href="?lang=th"><spring:message code="lang.th" /></a>
        </div>
    </nav>

    <main class="page">
        <p class="eyebrow"><spring:message code="booking.eyebrow" /></p>
        <h1><spring:message code="booking.heading" /></h1>
        <p class="lead"><spring:message code="booking.lead" /></p>

        <form class="booking-form" action="/booking" method="post">
            <label>
                <spring:message code="booking.form.name" />
                <input type="text" name="name" placeholder="<spring:message code='booking.placeholder.name' />" required>
            </label>
            <label>
                <spring:message code="booking.form.phone" />
                <input type="text" name="phone" placeholder="<spring:message code='booking.placeholder.phone' />" required>
            </label>
            <label>
                <spring:message code="booking.form.guests" />
                <input type="number" name="guests" min="1" max="20" value="2" required>
            </label>
            <label>
                <spring:message code="booking.form.date" />
                <input type="date" name="bookDate" required>
            </label>
            <label>
                <spring:message code="booking.form.time" />
                <select name="bookTime" required>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                </select>
            </label>
            <button class="btn primary" type="submit"><spring:message code="booking.submit" /></button>
        </form>

        <section class="table-wrap">
            <h2><spring:message code="booking.list.title" /></h2>
            <table>
                <thead>
                    <tr>
                        <th><spring:message code="booking.table.id" /></th>
                        <th><spring:message code="booking.table.name" /></th>
                        <th><spring:message code="booking.table.phone" /></th>
                        <th><spring:message code="booking.table.guests" /></th>
                        <th><spring:message code="booking.table.date" /></th>
                        <th><spring:message code="booking.table.time" /></th>
                        <th><spring:message code="booking.table.delete" /></th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach var="reservation" items="${reservations}">
                        <tr>
                            <td>${reservation.id}</td>
                            <td>${reservation.name}</td>
                            <td>${reservation.phone}</td>
                            <td>${reservation.guests}</td>
                            <td>${reservation.bookDate}</td>
                            <td>${reservation.bookTime}</td>
                            <td>
                                <form action="/booking/delete" method="post">
                                    <input type="hidden" name="id" value="${reservation.id}">
                                    <button class="link-button" type="submit"><spring:message code="booking.table.delete" /></button>
                                </form>
                            </td>
                        </tr>
                    </c:forEach>
                    <c:if test="${empty reservations}">
                        <tr>
                            <td colspan="7" class="empty"><spring:message code="booking.empty" /></td>
                        </tr>
                    </c:if>
                </tbody>
            </table>
        </section>
    </main>

    <script src="/js/eastwood888.js"></script>
</body>
</html>
