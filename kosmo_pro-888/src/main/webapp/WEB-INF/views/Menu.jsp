<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- [EXPLAIN-CODE 007] /menu URL 요청이 오면 Controller가 return "Menu"를 해서 이 화면을 보여줍니다. -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title><spring:message code="menu.title" /></title>
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
        <p class="eyebrow"><spring:message code="menu.eyebrow" /></p>
        <h1><spring:message code="menu.heading" /></h1>
        <p class="lead"><spring:message code="menu.lead" /></p>

        <div class="menu-photo-grid">
            <a href="/images/gogi-menu-1.jpg" target="_blank">
                <img src="/images/gogi-menu-1.jpg" alt="888 GOGI menu page 1">
            </a>
            <a href="/images/gogi-menu-2.jpg" target="_blank">
                <img src="/images/gogi-menu-2.jpg" alt="888 GOGI menu page 2">
            </a>
            <a href="/images/gogi-menu-3.jpg" target="_blank">
                <img src="/images/gogi-menu-3.jpg" alt="888 GOGI menu page 3">
            </a>
        </div>

        <h2><spring:message code="menu.summary.title" /></h2>
        <div class="menu-list">
            <div class="menu-row">
                <div>
                    <strong><spring:message code="menu.item.wagyu.name" /></strong>
                    <span><spring:message code="menu.item.wagyu.desc" /></span>
                </div>
                <b><spring:message code="menu.badge.market" /></b>
            </div>
            <div class="menu-row">
                <div>
                    <strong><spring:message code="menu.item.bulgogi.name" /></strong>
                    <span><spring:message code="menu.item.bulgogi.desc" /></span>
                </div>
                <b><spring:message code="menu.badge.popular" /></b>
            </div>
            <div class="menu-row">
                <div>
                    <strong><spring:message code="menu.item.chicken.name" /></strong>
                    <span><spring:message code="menu.item.chicken.desc" /></span>
                </div>
                <b><spring:message code="menu.badge.popular" /></b>
            </div>
            <div class="menu-row">
                <div>
                    <strong><spring:message code="menu.item.noodle.name" /></strong>
                    <span><spring:message code="menu.item.noodle.desc" /></span>
                </div>
                <b><spring:message code="menu.badge.noodle" /></b>
            </div>
            <div class="menu-row">
                <div>
                    <strong><spring:message code="menu.item.hotpot.name" /></strong>
                    <span><spring:message code="menu.item.hotpot.desc" /></span>
                </div>
                <b><spring:message code="menu.badge.hotpot" /></b>
            </div>
            <div class="menu-row">
                <div>
                    <strong><spring:message code="menu.item.side.name" /></strong>
                    <span><spring:message code="menu.item.side.desc" /></span>
                </div>
                <b><spring:message code="menu.badge.side" /></b>
            </div>
        </div>
        <a class="btn primary" href="/booking"><spring:message code="menu.cta.booking" /></a>
    </main>
</body>
</html>
