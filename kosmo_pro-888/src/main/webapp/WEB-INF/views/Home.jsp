<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- [EXPLAIN-CODE 006] Controller가 return "Home"을 하면 이 JSP가 화면에 보입니다. -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title><spring:message code="home.title" /></title>
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

    <main class="hero hero-bg">
        <div class="hero-copy">
            <p class="eyebrow"><spring:message code="home.eyebrow" /></p>
            <h1><spring:message code="home.heading" /></h1>
            <p class="lead"><spring:message code="home.lead" /></p>
            <div class="actions">
                <a class="btn primary" href="/menu"><spring:message code="home.cta.menu" /></a>
                <a class="btn" href="/booking"><spring:message code="home.cta.booking" /></a>
            </div>
        </div>
    </main>

    <section class="section">
        <h2><spring:message code="home.info.title" /></h2>
        <div class="cards">
            <article>
                <strong><spring:message code="home.info.address.title" /></strong>
                <p><spring:message code="home.info.address.body" /></p>
            </article>
            <article>
                <strong><spring:message code="home.info.hours.title" /></strong>
                <p><spring:message code="home.info.hours.body" /></p>
            </article>
            <article>
                <strong><spring:message code="home.info.practice.title" /></strong>
                <p><spring:message code="home.info.practice.body" /></p>
            </article>
        </div>
    </section>

    <section class="section photo-section">
        <h2><spring:message code="home.photos.title" /></h2>
        <div class="photo-grid">
            <img src="/images/gogi-exterior.jpg" alt="888 GOGI exterior">
            <img src="/images/gogi-food-1.jpg" alt="888 GOGI food table">
            <img src="/images/gogi-food-2.jpg" alt="888 GOGI BBQ meal">
        </div>
    </section>
</body>
</html>
